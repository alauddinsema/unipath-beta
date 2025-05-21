
export interface University {
  id?: string;
  name: string;
  alpha_two_code?: string;
  web_pages?: string[];
  domains?: string[];
  country?: string;
  state_province?: string | null;
  city?: string;
  latitude?: number;
  longitude?: number;
  region?: string;
  min_gpa?: number;
  min_sat_score?: number | null;
  min_ielts_score?: number;
  min_duolingo_score?: number;
  degree_types?: string[];
  degree_type?: string;
  scholarships_available?: boolean;
  acceptance_rate?: number;
  student_faculty_ratio?: string;
  website?: string;
}
