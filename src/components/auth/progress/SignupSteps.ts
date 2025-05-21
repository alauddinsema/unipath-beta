
import { CheckCircle2, GraduationCap } from 'lucide-react';

export interface SignupStep {
  title: string;
  description: string;
  icon: any;
  label: string; // Adding label for display in progress nav
}

export const SIGNUP_STEPS: SignupStep[] = [
  {
    title: 'Account Information',
    description: 'Create your login credentials',
    icon: CheckCircle2,
    label: 'Account'
  },
  {
    title: 'Academic Profile',
    description: 'Tell us about your education background',
    icon: GraduationCap,
    label: 'Academic'
  }
];
