
import { corsHeaders } from './corsHeaders.ts';
import { fetchUniversityData } from './dataFetcher.ts';
import { importUniversitiesToDatabase } from './databaseOperations.ts';

export async function handleRequest(req: Request): Promise<Response> {
  try {
    if (req.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    // Parse the request body
    const { dataSourceUrl, action } = await req.json();
    
    if (action === 'get-logs') {
      // Simple placeholder for log retrieval (would need to be implemented with actual logging)
      return new Response(
        JSON.stringify({ 
          logs: ['Import function started', 'Fetching data...', 'Data processed', 'Import completed']
        }),
        { headers: { 'Content-Type': 'application/json', ...corsHeaders } }
      );
    }
    
    if (action === 'import') {
      console.log(`Starting university import from ${dataSourceUrl || 'default source'}`);
      
      // Fetch data from source
      const universities = await fetchUniversityData(dataSourceUrl);
      
      console.log(`Fetched ${universities.length} universities, beginning import to database`);
      
      // Import to database
      const importedCount = await importUniversitiesToDatabase(universities);
      
      console.log(`Successfully imported ${importedCount} universities to database`);
      
      return new Response(
        JSON.stringify({ 
          success: true, 
          count: importedCount, 
          message: `Successfully imported ${importedCount} universities` 
        }),
        { headers: { 'Content-Type': 'application/json', ...corsHeaders } }
      );
    }
    
    return new Response(
      JSON.stringify({ 
        success: false, 
        message: 'Invalid action. Use "import" or "get-logs".' 
      }),
      { 
        status: 400,
        headers: { 'Content-Type': 'application/json', ...corsHeaders }
      }
    );
  } catch (error) {
    console.error('Error handling request:', error);
    
    return new Response(
      JSON.stringify({ 
        success: false, 
        message: error.message || 'An error occurred during import' 
      }),
      { 
        status: 500,
        headers: { 'Content-Type': 'application/json', ...corsHeaders } 
      }
    );
  }
}
