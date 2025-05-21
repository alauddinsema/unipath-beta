
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const GEMINI_API_KEY = Deno.env.get('GEMINI_API_KEY') || '';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Verify API key exists
    if (!GEMINI_API_KEY) {
      console.error('GEMINI_API_KEY is not set');
      throw new Error('GEMINI_API_KEY is not configured');
    }

    const { message, platformInfo } = await req.json();

    // Build system message with platform knowledge
    const prompt = `
You are an AI assistant for UniPath, a platform that helps students find and apply to universities worldwide.
Here is important information about the platform that you can use to help users:
${platformInfo.join('\n')}

User query: ${message}

Always be helpful, concise, and accurate. If you don't know something, say so rather than making up information.
    `;

    console.log('Sending request to Gemini API');
    
    // Use a more reliable API endpoint and model
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              { text: prompt }
            ]
          }
        ],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 800,
          topP: 0.8,
          topK: 40
        },
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Gemini API error:', errorData);
      throw new Error(`Gemini API error: ${errorData.error?.message || response.statusText}`);
    }

    const data = await response.json();
    console.log('Received response from Gemini API:', data);
    
    // Extract the response text from Gemini's response format with better error handling
    let responseText = '';
    if (data.candidates && 
        data.candidates.length > 0 && 
        data.candidates[0].content && 
        data.candidates[0].content.parts && 
        data.candidates[0].content.parts.length > 0) {
      responseText = data.candidates[0].content.parts[0].text || '';
    } 
    
    if (!responseText) {
      console.error('Invalid or empty response from Gemini API:', data);
      throw new Error('Failed to get a valid response from Gemini API');
    }
    
    return new Response(
      JSON.stringify({ 
        content: responseText,
        timestamp: new Date().toISOString()
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error in ai-chat function:', error);
    return new Response(
      JSON.stringify({ 
        error: error.message || 'An unexpected error occurred',
        timestamp: new Date().toISOString()
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }, 
        status: 500 
      }
    );
  }
});
