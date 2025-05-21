
import { SignupFormData } from '@/utils/signupValidation';

export type SignupFormState = Partial<SignupFormData & { 
  achievements?: string[];
  institutionName?: string;
  degreeType?: string;
  fieldOfStudy?: string;
  startDate?: string;
  endDate?: string;
}>;

export type Plan = 'free' | 'basic' | 'premium';
