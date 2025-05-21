
import React, { useState } from 'react';
import { PathTrack, PathStepData } from '../PathTrack';
import { UserDocument } from '@/types/documents';
import { DialogManageDocument } from '../DialogManageDocument';
import { UniversitySelectionDialog } from '../UniversitySelectionDialog';
import { ActionStepDialog } from '../ActionStepDialog';
import { useCompletedSteps } from '../hooks/useCompletedSteps';
import { usePathSteps } from '../hooks/usePathSteps';

interface PathTabContentProps {
  pathType: string;
  documentsByCategory: {
    [key: string]: UserDocument[];
  };
  loading: boolean;
  loadDocuments: () => void;
  handleDocumentDeleted: (id: string) => void;
  subscription: { 
    isPaid: boolean;
    planType: 'free' | 'basic' | 'premium';
  } | null;
  userId?: string;
}

export function PathTabContent({
  pathType,
  documentsByCategory,
  loading,
  loadDocuments,
  handleDocumentDeleted,
  subscription,
  userId
}: PathTabContentProps) {
  const [selectedStep, setSelectedStep] = useState<PathStepData | null>(null);
  const [showDocumentDialog, setShowDocumentDialog] = useState(false);
  const [showUniversitySelectionDialog, setShowUniversitySelectionDialog] = useState(false);
  const [showActionStepDialog, setShowActionStepDialog] = useState(false);
  
  const { completedSteps, markStepAsCompleted } = useCompletedSteps(userId);
  const { steps } = usePathSteps(pathType, documentsByCategory, completedSteps);
  
  const handleStepClick = (step: PathStepData) => {
    setSelectedStep(step);
    
    if (step.type === 'document') {
      setShowDocumentDialog(true);
    } else if (step.type === 'action') {
      if (step.id === 'university_selection' && step.status !== 'locked') {
        setShowUniversitySelectionDialog(true);
      } else if (step.status !== 'locked') {
        setShowActionStepDialog(true);
      }
    }
  };
  
  const handleUploadClick = (step: PathStepData) => {
    setSelectedStep(step);
    setShowDocumentDialog(true);
  };

  const handleUniversitySelectionComplete = () => {
    markStepAsCompleted('university_selection');
  };

  const handleActionStepComplete = () => {
    if (selectedStep) {
      markStepAsCompleted(selectedStep.id);
    }
  };
  
  return (
    <>
      <PathTrack 
        steps={steps}
        onStepClick={handleStepClick}
        onUploadClick={handleUploadClick}
      />
      
      {renderDialogs()}
    </>
  );
  
  function renderDialogs() {
    if (!selectedStep) return null;
    
    return (
      <>
        <DialogManageDocument
          open={showDocumentDialog}
          onOpenChange={setShowDocumentDialog}
          step={selectedStep}
          documents={selectedStep.documents || []}
          category={selectedStep.id}
          onDocumentUploaded={() => {
            loadDocuments();
            if (selectedStep.documents && selectedStep.documents.length === 0) {
              markStepAsCompleted(selectedStep.id);
            }
          }}
          onDocumentDeleted={handleDocumentDeleted}
          subscription={subscription || { isPaid: false, planType: 'free' }}
        />

        <UniversitySelectionDialog
          open={showUniversitySelectionDialog}
          onOpenChange={setShowUniversitySelectionDialog}
          onSelectionComplete={handleUniversitySelectionComplete}
        />

        <ActionStepDialog
          open={showActionStepDialog}
          onOpenChange={setShowActionStepDialog}
          stepId={selectedStep.id}
          title={selectedStep.title}
          description={selectedStep.description}
          onComplete={handleActionStepComplete}
        />
      </>
    );
  }
}
