
import { UserDocument } from '@/types/documents';
import { PathStepData } from '../PathTrack';

interface DocumentsByCategory {
  [key: string]: UserDocument[];
}

export function usePathSteps(
  pathType: string, 
  documentsByCategory: DocumentsByCategory = {}, 
  completedSteps: string[] = []
) {
  const createPathSteps = (): PathStepData[] => {
    switch(pathType) {
      case 'application':
        return [
          {
            id: 'identification',
            title: 'Identification Documents',
            description: 'Upload your ID, passport and other identification documents',
            status: documentsByCategory.identification?.length > 0 || completedSteps.includes('identification') 
              ? 'completed' 
              : 'current',
            type: 'document',
            documents: documentsByCategory.identification || []
          },
          {
            id: 'academic',
            title: 'Academic Records',
            description: 'Upload your diplomas, transcripts, and certificates',
            status: (documentsByCategory.identification?.length > 0 || completedSteps.includes('identification'))
              ? (documentsByCategory.academic?.length > 0 || completedSteps.includes('academic') 
                ? 'completed' 
                : 'current')
              : 'available',
            type: 'document',
            documents: documentsByCategory.academic || []
          },
          {
            id: 'test_scores',
            title: 'Test Scores',
            description: 'Upload your IELTS, TOEFL, SAT, GRE scores',
            status: (documentsByCategory.academic?.length > 0 || completedSteps.includes('academic'))
              ? (documentsByCategory.test_scores?.length > 0 || completedSteps.includes('test_scores') 
                ? 'completed' 
                : 'current')
              : 'available',
            type: 'document',
            documents: documentsByCategory.test_scores || []
          },
          {
            id: 'university_selection',
            title: 'University Selection',
            description: 'Choose your target universities',
            status: (documentsByCategory.test_scores?.length > 0 || completedSteps.includes('test_scores')) 
              ? (completedSteps.includes('university_selection') 
                ? 'completed' 
                : 'current') 
              : 'available',
            type: 'action',
            documents: []
          },
          {
            id: 'personal_statement',
            title: 'Personal Statement',
            description: 'Craft your personal statement',
            status: completedSteps.includes('university_selection')
              ? (completedSteps.includes('personal_statement') ? 'completed' : 'current')
              : 'locked',
            type: 'document',
            documents: documentsByCategory.personal_statement || []
          },
          {
            id: 'application_submission',
            title: 'Submit Applications',
            description: 'Submit your applications to chosen universities',
            status: completedSteps.includes('personal_statement')
              ? (completedSteps.includes('application_submission') ? 'completed' : 'current')
              : 'locked',
            type: 'action',
            documents: []
          }
        ];
      case 'visa':
        return [
          {
            id: 'visa_form',
            title: 'Visa Application Form',
            description: 'Complete your visa application form',
            status: completedSteps.includes('visa_form') ? 'completed' : 'current',
            type: 'document',
            documents: documentsByCategory.visa_form || []
          },
          {
            id: 'financial_documents',
            title: 'Financial Documents',
            description: 'Proof of financial support for your studies',
            status: completedSteps.includes('visa_form')
              ? (completedSteps.includes('financial_documents') ? 'completed' : 'current')
              : 'available',
            type: 'document',
            documents: documentsByCategory.financial_documents || []
          },
          {
            id: 'visa_interview',
            title: 'Visa Interview',
            description: 'Prepare for your visa interview',
            status: completedSteps.includes('financial_documents')
              ? (completedSteps.includes('visa_interview') ? 'completed' : 'current')
              : 'locked',
            type: 'action',
            documents: []
          },
          {
            id: 'travel_arrangements',
            title: 'Travel Arrangements',
            description: 'Book flights and arrange accommodation',
            status: completedSteps.includes('visa_interview')
              ? (completedSteps.includes('travel_arrangements') ? 'completed' : 'current')
              : 'locked',
            type: 'action',
            documents: []
          }
        ];
      default:
        return [];
    }
  };
  
  return { steps: createPathSteps() };
}
