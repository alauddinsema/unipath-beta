
export interface University {
  id: string;
  name: string;
  country: string;
  city?: string;
  state_province?: string;
  domains?: string[];
  web_pages?: string[];
  alpha_two_code?: string;
  region?: string;
  scholarships_available?: boolean;
  min_gpa?: number;
  min_sat_score?: number;
  min_ielts_score?: number;
  min_duolingo_score?: number;
  degree_type?: string;
  acceptance_rate?: number;
  student_faculty_ratio?: string;
  website?: string;
  latitude?: number;
  longitude?: number;
  created_at?: string;
}

export interface UserCredits {
  id: string;
  userId: string;
  totalCredits: number;
  usedCredits: number;
  lastUpdated: string;
}

export interface SearchFiltersState {
  keyword: string;
  country: string;
  region: string;
  scholarshipsOnly: boolean;
  minGpa: string;
  minSatScore: string;
  minIeltsScore: string;
  minDuolingoScore: string;
  degreeType: string;
}

export interface AcademicAchievement {
  id: string;
  userId: string;
  institutionName: string;
  degreeType: string;
  fieldOfStudy: string;
  startDate: string;
  endDate?: string;
  gpa?: number;
  achievements: string[];
  createdAt: string;
}
