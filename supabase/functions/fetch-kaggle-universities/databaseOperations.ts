
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.0'
import { corsHeaders } from './corsHeaders.ts'
import type { University } from './types.ts'

export async function importUniversitiesToDatabase(universities: University[]) {
  const supabaseUrl = Deno.env.get('SUPABASE_URL') || ''
  const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || ''

  if (!supabaseUrl || !supabaseKey) {
    throw new Error('Missing Supabase environment variables');
  }

  // Create a Supabase client with the service role key (needed for admin operations)
  const supabase = createClient(supabaseUrl, supabaseKey)
  console.log(`Connecting to Supabase at ${supabaseUrl}`);
  
  // First, delete all existing universities
  console.log('Deleting existing universities...');
  const { error: deleteError } = await supabase
    .from('universities')
    .delete()
    .neq('id', '00000000-0000-0000-0000-000000000000') // A dummy condition to delete all

  if (deleteError) {
    console.error('Error deleting universities:', deleteError);
    throw deleteError;
  }
  
  console.log(`Deleted existing universities. Importing ${universities.length} universities...`);

  // Insert the universities in batches to avoid timeouts
  const batchSize = 50;
  let successCount = 0;
  
  for (let i = 0; i < universities.length; i += batchSize) {
    const batch = universities.slice(i, i + batchSize);
    console.log(`Processing batch ${i/batchSize + 1} of ${Math.ceil(universities.length/batchSize)}, size: ${batch.length}`);
    
    const universityRecords = batch.map(uni => {
      const website = uni.web_pages && uni.web_pages.length > 0 ? uni.web_pages[0] : (uni.website || null);
      
      return {
        name: uni.name || 'Unknown University',
        country: uni.country || 'Unknown',
        state_province: uni.state_province,
        city: uni.city,
        website: website,
        alpha_two_code: uni.alpha_two_code,
        domains: uni.domains || [],
        web_pages: uni.web_pages || [],
        latitude: uni.latitude,
        longitude: uni.longitude,
        region: uni.region || 'Unknown',
        scholarships_available: uni.scholarships_available || false,
        acceptance_rate: uni.acceptance_rate,
        student_faculty_ratio: uni.student_faculty_ratio || `${Math.floor(Math.random() * 20) + 1}:1`, // Random if not provided
        min_gpa: uni.min_gpa,
        min_sat_score: uni.min_sat_score,
        min_ielts_score: uni.min_ielts_score,
        min_duolingo_score: uni.min_duolingo_score,
        degree_type: uni.degree_type || (uni.degree_types && uni.degree_types.length > 0 ? uni.degree_types[0] : 'Bachelor')
      };
    });
    
    const { error: insertError } = await supabase
      .from('universities')
      .insert(universityRecords);

    if (insertError) {
      console.error('Error inserting university batch:', insertError);
      console.error('Sample university data:', universityRecords[0]);
    } else {
      successCount += batch.length;
      console.log(`Successfully inserted batch ${i/batchSize + 1}, total: ${successCount}`);
    }
  }

  console.log(`Import completed: ${successCount} out of ${universities.length} universities imported`);
  return successCount;
}
