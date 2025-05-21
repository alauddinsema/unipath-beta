
import { serve } from 'https://deno.land/std@0.177.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.38.0'

interface MistralAIRequest {
  messages: Array<{
    role: 'system' | 'user' | 'assistant';
    content: string;
  }>;
  platformInfo?: string[];
}

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

serve(async (req) => {
  // Handle CORS
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // Create a Supabase client with the Auth context of the function
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      { global: { headers: { Authorization: req.headers.get('Authorization') ?? '' } } }
    )

    // Get Mistral API key from environment variables
    const mistralApiKey = Deno.env.get('MISTRAL_API_KEY')
    if (!mistralApiKey) {
      throw new Error('MISTRAL_API_KEY is not set in environment variables')
    }

    // Parse request body
    const { messages, platformInfo } = await req.json() as MistralAIRequest

    if (!messages || !Array.isArray(messages)) {
      throw new Error('Invalid request body: messages array is required')
    }

    // Append platform information to system message
    if (platformInfo && platformInfo.length > 0) {
      const platformContext = `Additional platform information: ${platformInfo.join(' ')}`;
      
      // Find system message or create one
      const systemMessageIndex = messages.findIndex(msg => msg.role === 'system');
      if (systemMessageIndex >= 0) {
        messages[systemMessageIndex].content += '\n\n' + platformContext;
      } else {
        messages.unshift({
          role: 'system',
          content: platformContext
        });
      }
    }

    // Call Mistral AI API
    const mistralResponse = await fetch('https://api.mistral.ai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${mistralApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'mistral-large-latest',
        messages: messages,
        temperature: 0.7,
        max_tokens: 1000,
      }),
    })

    const data = await mistralResponse.json()

    if (!mistralResponse.ok) {
      throw new Error(`Mistral API error: ${data.error?.message || 'Unknown error'}`)
    }

    // Return the response from Mistral
    return new Response(
      JSON.stringify({
        content: data.choices[0].message.content,
        model: data.model,
      }),
      {
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      }
    )
  } catch (error) {
    console.error('Error processing request:', error)
    
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      }
    )
  }
})
