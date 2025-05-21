
import { serve } from 'https://deno.land/std@0.177.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.38.0'

interface ClaudeAIRequest {
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
    return new Response(null, { headers: corsHeaders })
  }

  try {
    // Create a Supabase client with the Auth context of the function
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      { global: { headers: { Authorization: req.headers.get('Authorization') ?? '' } } }
    )

    // Get Claude API key from environment variables
    const claudeApiKey = Deno.env.get('CLAUDE_API_KEY')
    if (!claudeApiKey) {
      throw new Error('CLAUDE_API_KEY is not set in environment variables')
    }

    // Parse request body
    const { messages, platformInfo } = await req.json() as ClaudeAIRequest

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

    // Format messages for Claude API
    const claudeMessages = messages.map(msg => ({
      role: msg.role,
      content: msg.content
    }));

    console.log('Calling Claude API with messages:', JSON.stringify(claudeMessages));

    // Call Claude API
    const claudeResponse = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': claudeApiKey,
        'anthropic-version': '2023-06-01',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'claude-3-opus-20240229',
        messages: claudeMessages,
        max_tokens: 1000,
      }),
    })

    const data = await claudeResponse.json()

    if (!claudeResponse.ok) {
      console.error('Claude API error response:', data)
      throw new Error(`Claude API error: ${data.error?.message || 'Unknown error'}`)
    }

    console.log('Claude API response status:', claudeResponse.status);
    console.log('Claude API response:', JSON.stringify(data).substring(0, 200) + '...');

    // Return the response from Claude
    return new Response(
      JSON.stringify({
        content: data.content && data.content[0]?.text || 'No response from Claude',
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
