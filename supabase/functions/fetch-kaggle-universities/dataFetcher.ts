
export async function fetchUniversityData(dataSourceUrl: string | null = null) {
  // If a data source URL is provided, attempt to fetch from that URL
  if (dataSourceUrl) {
    try {
      console.log(`Fetching universities from provided URL: ${dataSourceUrl}`);
      const response = await fetch(dataSourceUrl);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch from provided URL: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
      console.log(`Successfully fetched ${data.length} universities from provided URL`);
      return data;
    } catch (error) {
      console.error('Error fetching from provided URL:', error);
      // Fall through to next data source
    }
  }
  
  try {
    // Try to fetch from the world_universities table
    console.log('Fetching universities from world_universities table');
    const universities = await fetchFromWorldUniversitiesTable();
    console.log(`Successfully transformed ${universities.length} universities from world_universities table`);
    return universities;
  } catch (error) {
    console.error('Error fetching from world_universities table:', error);
    
    // Fall back to sample data if all else fails
    console.log('Falling back to sample data');
    const { sampleUniversities } = await import('./sampleData.ts');
    console.log(`Using ${sampleUniversities.length} sample universities`);
    return sampleUniversities;
  }
}

async function fetchFromWorldUniversitiesTable() {
  const supabaseUrl = Deno.env.get('SUPABASE_URL') || '';
  const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || '';
  
  if (!supabaseUrl || !supabaseKey) {
    throw new Error('Missing Supabase environment variables');
  }
  
  // Create Supabase client
  const { createClient } = await import('https://esm.sh/@supabase/supabase-js@2.39.0');
  const supabase = createClient(supabaseUrl, supabaseKey);
  
  // Fetch all universities from world_universities table
  console.log('Querying world_universities table');
  const { data, error } = await supabase
    .from('world_universities')
    .select('*');
    
  if (error) {
    throw new Error(`Error fetching from world_universities: ${error.message}`);
  }
  
  if (!data || data.length === 0) {
    throw new Error('No universities found in world_universities table');
  }
  
  console.log(`Found ${data.length} universities in world_universities table`);
  
  // Get column names to help with transformation
  const sampleRow = data[0];
  const columns = Object.keys(sampleRow);
  console.log('Columns in world_universities:', columns);
  
  // Transform data from world_universities format to our University format
  return transformWorldUniversitiesData(data, columns);
}

function transformWorldUniversitiesData(data, columns) {
  console.log('Transforming world_universities data');
  
  // Try to determine which columns contain what data based on your CSV structure 
  // (using the screenshot as reference)
  let countryCodeColumn = '';
  let nameColumn = '';
  let websiteColumn = '';
  
  // Based on your screenshot, we can see the columns might be in this order
  if (columns.length >= 3) {
    countryCodeColumn = columns[0]; // First column appears to be country code (AD)
    nameColumn = columns[1];        // Second column appears to be university name
    websiteColumn = columns[2];     // Third column appears to be website URL
  }
  
  console.log('Identified columns:', { 
    countryCode: countryCodeColumn, 
    name: nameColumn, 
    website: websiteColumn 
  });
  
  return data.map((row, index) => {
    // Extract values using the identified columns
    const countryCode = row[countryCodeColumn];
    const universityName = row[nameColumn];
    const website = row[websiteColumn];
    
    // Create a university object with transformed data
    return {
      name: universityName || `University ${index + 1}`,
      country: mapCountryCode(countryCode) || 'Unknown',
      web_pages: website ? [website] : [],
      domains: website ? [extractDomain(website)] : [],
      alpha_two_code: countryCode,
      state_province: null,
      city: null,
      region: determineRegion(countryCode),
      scholarships_available: Math.random() > 0.7, // Random for demo
      min_gpa: generateRandomGpa(),
      min_sat_score: generateRandomSatScore(),
      min_ielts_score: generateRandomIeltsScore(),
      min_duolingo_score: generateRandomDuolingoScore(),
      degree_type: generateRandomDegreeType(),
      acceptance_rate: generateRandomAcceptanceRate(),
      student_faculty_ratio: `${Math.floor(Math.random() * 20) + 1}:1`, // Random for demo
      website: website
    };
  });
}

// Helper functions to determine column roles based on column names
function findCountryCodeColumn(columns) {
  // Try to find a 2-letter country code column
  const codeColumns = columns.filter(col => 
    col.length === 2 && col === col.toUpperCase()
  );
  
  if (codeColumns.length > 0) {
    return codeColumns[0];
  }
  
  // If no obvious country code column, look for columns with 'country' in the name
  const countryColumns = columns.filter(col => 
    col.toLowerCase().includes('country') ||
    col.toLowerCase().includes('nation')
  );
  
  return countryColumns.length > 0 ? countryColumns[0] : columns[0];
}

function findUniversityNameColumn(columns) {
  // Look for columns that might contain university names
  const nameColumns = columns.filter(col => 
    col.toLowerCase().includes('university') ||
    col.toLowerCase().includes('college') ||
    col.toLowerCase().includes('name') ||
    col.toLowerCase().includes('institution')
  );
  
  if (nameColumns.length > 0) {
    return nameColumns[0];
  }
  
  // If no obvious name column, use the second column as a fallback
  return columns.length > 1 ? columns[1] : columns[0];
}

function findWebsiteColumn(columns) {
  // Look for columns that might contain website URLs
  const websiteColumns = columns.filter(col => 
    col.toLowerCase().includes('http') ||
    col.toLowerCase().includes('www') ||
    col.toLowerCase().includes('web') ||
    col.toLowerCase().includes('site') ||
    col.toLowerCase().includes('url')
  );
  
  return websiteColumns.length > 0 ? websiteColumns[0] : null;
}

function extractDomain(url) {
  if (!url) return '';
  
  try {
    const hostname = new URL(url).hostname;
    return hostname.replace(/^www\./, '');
  } catch (e) {
    return url.includes('www.') ? 
      url.split('www.')[1].split('/')[0] : 
      url.split('//')[1]?.split('/')[0] || url;
  }
}

// Helper functions from before (keeping them)
function mapCountryCode(code) {
  if (!code) return 'Unknown';
  
  const countryMap = {
    'AD': 'Andorra',
    'AE': 'United Arab Emirates',
    'AF': 'Afghanistan',
    'AG': 'Antigua and Barbuda',
    'AL': 'Albania',
    'AM': 'Armenia',
    'AO': 'Angola',
    'AR': 'Argentina',
    'AT': 'Austria',
    'AU': 'Australia',
    'AZ': 'Azerbaijan',
    'BA': 'Bosnia and Herzegovina',
    'BB': 'Barbados',
    'BD': 'Bangladesh',
    'BE': 'Belgium',
    'BF': 'Burkina Faso',
    'BG': 'Bulgaria',
    'BH': 'Bahrain',
    'BI': 'Burundi',
    'BJ': 'Benin',
    'BN': 'Brunei',
    'BO': 'Bolivia',
    'BR': 'Brazil',
    'BS': 'Bahamas',
    'BT': 'Bhutan',
    'BW': 'Botswana',
    'BY': 'Belarus',
    'BZ': 'Belize',
    'CA': 'Canada',
    'CD': 'Democratic Republic of the Congo',
    'CF': 'Central African Republic',
    'CG': 'Republic of the Congo',
    'CH': 'Switzerland',
    'CI': 'Ivory Coast',
    'CL': 'Chile',
    'CM': 'Cameroon',
    'CN': 'China',
    'CO': 'Colombia',
    'CR': 'Costa Rica',
    'CU': 'Cuba',
    'CV': 'Cape Verde',
    'CY': 'Cyprus',
    'CZ': 'Czech Republic',
    'DE': 'Germany',
    'DJ': 'Djibouti',
    'DK': 'Denmark',
    'DM': 'Dominica',
    'DO': 'Dominican Republic',
    'DZ': 'Algeria',
    'EC': 'Ecuador',
    'EE': 'Estonia',
    'EG': 'Egypt',
    'ER': 'Eritrea',
    'ES': 'Spain',
    'ET': 'Ethiopia',
    'FI': 'Finland',
    'FJ': 'Fiji',
    'FM': 'Micronesia',
    'FR': 'France',
    'GA': 'Gabon',
    'GB': 'United Kingdom',
    'GD': 'Grenada',
    'GE': 'Georgia',
    'GH': 'Ghana',
    'GM': 'Gambia',
    'GN': 'Guinea',
    'GQ': 'Equatorial Guinea',
    'GR': 'Greece',
    'GT': 'Guatemala',
    'GW': 'Guinea-Bissau',
    'GY': 'Guyana',
    'HN': 'Honduras',
    'HR': 'Croatia',
    'HT': 'Haiti',
    'HU': 'Hungary',
    'ID': 'Indonesia',
    'IE': 'Ireland',
    'IL': 'Israel',
    'IN': 'India',
    'IQ': 'Iraq',
    'IR': 'Iran',
    'IS': 'Iceland',
    'IT': 'Italy',
    'JM': 'Jamaica',
    'JO': 'Jordan',
    'JP': 'Japan',
    'KE': 'Kenya',
    'KG': 'Kyrgyzstan',
    'KH': 'Cambodia',
    'KI': 'Kiribati',
    'KM': 'Comoros',
    'KN': 'Saint Kitts and Nevis',
    'KP': 'North Korea',
    'KR': 'South Korea',
    'KW': 'Kuwait',
    'KZ': 'Kazakhstan',
    'LA': 'Laos',
    'LB': 'Lebanon',
    'LC': 'Saint Lucia',
    'LI': 'Liechtenstein',
    'LK': 'Sri Lanka',
    'LR': 'Liberia',
    'LS': 'Lesotho',
    'LT': 'Lithuania',
    'LU': 'Luxembourg',
    'LV': 'Latvia',
    'LY': 'Libya',
    'MA': 'Morocco',
    'MC': 'Monaco',
    'MD': 'Moldova',
    'ME': 'Montenegro',
    'MG': 'Madagascar',
    'MH': 'Marshall Islands',
    'MK': 'North Macedonia',
    'ML': 'Mali',
    'MM': 'Myanmar',
    'MN': 'Mongolia',
    'MR': 'Mauritania',
    'MT': 'Malta',
    'MU': 'Mauritius',
    'MV': 'Maldives',
    'MW': 'Malawi',
    'MX': 'Mexico',
    'MY': 'Malaysia',
    'MZ': 'Mozambique',
    'NA': 'Namibia',
    'NE': 'Niger',
    'NG': 'Nigeria',
    'NI': 'Nicaragua',
    'NL': 'Netherlands',
    'NO': 'Norway',
    'NP': 'Nepal',
    'NR': 'Nauru',
    'NZ': 'New Zealand',
    'OM': 'Oman',
    'PA': 'Panama',
    'PE': 'Peru',
    'PG': 'Papua New Guinea',
    'PH': 'Philippines',
    'PK': 'Pakistan',
    'PL': 'Poland',
    'PS': 'Palestine',
    'PT': 'Portugal',
    'PW': 'Palau',
    'PY': 'Paraguay',
    'QA': 'Qatar',
    'RO': 'Romania',
    'RS': 'Serbia',
    'RU': 'Russia',
    'RW': 'Rwanda',
    'SA': 'Saudi Arabia',
    'SB': 'Solomon Islands',
    'SC': 'Seychelles',
    'SD': 'Sudan',
    'SE': 'Sweden',
    'SG': 'Singapore',
    'SI': 'Slovenia',
    'SK': 'Slovakia',
    'SL': 'Sierra Leone',
    'SM': 'San Marino',
    'SN': 'Senegal',
    'SO': 'Somalia',
    'SR': 'Suriname',
    'SS': 'South Sudan',
    'ST': 'São Tomé and Príncipe',
    'SV': 'El Salvador',
    'SY': 'Syria',
    'SZ': 'Eswatini',
    'TD': 'Chad',
    'TG': 'Togo',
    'TH': 'Thailand',
    'TJ': 'Tajikistan',
    'TL': 'East Timor',
    'TM': 'Turkmenistan',
    'TN': 'Tunisia',
    'TO': 'Tonga',
    'TR': 'Turkey',
    'TT': 'Trinidad and Tobago',
    'TV': 'Tuvalu',
    'TW': 'Taiwan',
    'TZ': 'Tanzania',
    'UA': 'Ukraine',
    'UG': 'Uganda',
    'US': 'United States',
    'UY': 'Uruguay',
    'UZ': 'Uzbekistan',
    'VA': 'Vatican City',
    'VC': 'Saint Vincent and the Grenadines',
    'VE': 'Venezuela',
    'VN': 'Vietnam',
    'VU': 'Vanuatu',
    'WS': 'Samoa',
    'YE': 'Yemen',
    'ZA': 'South Africa',
    'ZM': 'Zambia',
    'ZW': 'Zimbabwe'
  };
  
  return countryMap[code] || 'Unknown';
}

function determineRegion(countryCode) {
  if (!countryCode) return 'Unknown';
  
  const regionMap = {
    'North America': ['US', 'CA', 'MX'],
    'South America': ['BR', 'AR', 'CO', 'PE', 'VE', 'CL', 'EC', 'BO', 'PY', 'UY', 'GY', 'SR', 'GF'],
    'Europe': ['GB', 'FR', 'DE', 'IT', 'ES', 'UA', 'PL', 'RO', 'NL', 'BE', 'GR', 'CZ', 'PT', 'SE', 'HU', 'BY', 'AT', 'CH', 'BG', 'DK', 'FI', 'SK', 'NO', 'IE', 'HR', 'MD', 'BA', 'AL', 'LT', 'MK', 'SI', 'LV', 'EE', 'ME', 'LU', 'MT', 'IS'],
    'Asia': ['CN', 'IN', 'ID', 'PK', 'BD', 'JP', 'PH', 'VN', 'TR', 'IR', 'TH', 'MM', 'KR', 'IQ', 'AF', 'SA', 'UZ', 'MY', 'YE', 'NP', 'KZ', 'KH', 'JO', 'AZ', 'AE', 'TJ', 'IL', 'LA', 'LB', 'KG', 'TM', 'SG', 'OM', 'PS', 'KW', 'GE', 'MN', 'AM', 'QA', 'BH'],
    'Africa': ['NG', 'ET', 'EG', 'CD', 'ZA', 'TZ', 'KE', 'UG', 'DZ', 'SD', 'MA', 'AO', 'GH', 'MZ', 'CI', 'MG', 'CM', 'NE', 'BF', 'ML', 'MW', 'ZM', 'SO', 'SN', 'TD', 'ZW', 'GN', 'RW', 'BJ', 'BI', 'TN', 'SS', 'TG', 'SL', 'LY', 'CG', 'LR', 'MR', 'ER', 'GM', 'BW', 'GA', 'LS', 'GW', 'CV', 'SZ', 'DJ', 'KM', 'ST'],
    'Oceania': ['AU', 'PG', 'NZ', 'FJ', 'SB', 'VU', 'WS', 'TO']
  };
  
  for (const [region, countries] of Object.entries(regionMap)) {
    if (countries.includes(countryCode)) {
      return region;
    }
  }
  
  return 'Unknown';
}

// Helper functions for generating random data
function generateRandomGpa() {
  return Number((2.5 + Math.random() * 1.5).toFixed(2));
}

function generateRandomSatScore() {
  return Math.floor(1000 + Math.random() * 600);
}

function generateRandomIeltsScore() {
  return Number((5.5 + Math.random() * 3).toFixed(1));
}

function generateRandomDuolingoScore() {
  return Math.floor(85 + Math.random() * 45);
}

function generateRandomDegreeType() {
  const types = ['Bachelor', 'Master', 'PhD', 'Associate'];
  return types[Math.floor(Math.random() * types.length)];
}

function generateRandomAcceptanceRate() {
  return Number((0.2 + Math.random() * 0.6).toFixed(2));
}
