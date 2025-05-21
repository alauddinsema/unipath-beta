
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { FileText, GraduationCap, Plane, Send } from 'lucide-react';

interface ActionStepDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  stepId: string;
  title: string;
  description: string;
  onComplete: () => void;
}

export function ActionStepDialog({
  open,
  onOpenChange,
  stepId,
  title,
  description,
  onComplete
}: ActionStepDialogProps) {
  const { toast } = useToast();
  
  const getIcon = () => {
    switch (stepId) {
      case 'university_selection':
        return <GraduationCap className="h-10 w-10 text-primary mb-2" />;
      case 'personal_statement':
        return <FileText className="h-10 w-10 text-primary mb-2" />;
      case 'application_submission':
        return <Send className="h-10 w-10 text-primary mb-2" />;
      case 'visa_interview':
        return <GraduationCap className="h-10 w-10 text-primary mb-2" />;
      case 'travel_arrangements':
        return <Plane className="h-10 w-10 text-primary mb-2" />;
      default:
        return null;
    }
  };

  const getActionContent = () => {
    switch (stepId) {
      case 'university_selection':
        return (
          <div className="text-center">
            {getIcon()}
            <h3 className="text-lg font-semibold mb-2">University Selection</h3>
            <p className="text-muted-foreground mb-4">
              Choose the universities you would like to apply to.
              You can favorite universities from the search tab.
            </p>
          </div>
        );
      case 'application_submission':
        return (
          <div className="text-center">
            {getIcon()}
            <h3 className="text-lg font-semibold mb-2">Submit Applications</h3>
            <p className="text-muted-foreground mb-4">
              Review your applications and submit them to your chosen universities.
              Make sure all required documents are uploaded and your personal statement is complete.
            </p>
          </div>
        );
      case 'visa_interview':
        return (
          <div className="text-center">
            {getIcon()}
            <h3 className="text-lg font-semibold mb-2">Visa Interview</h3>
            <p className="text-muted-foreground mb-4">
              Prepare for your visa interview by reviewing common questions and practicing your responses.
            </p>
          </div>
        );
      case 'travel_arrangements':
        return (
          <div className="text-center">
            {getIcon()}
            <h3 className="text-lg font-semibold mb-2">Travel Arrangements</h3>
            <p className="text-muted-foreground mb-4">
              Book your flights and arrange accommodation for your studies abroad.
            </p>
          </div>
        );
      default:
        return (
          <div className="text-center">
            <h3 className="text-lg font-semibold mb-2">{title}</h3>
            <p className="text-muted-foreground mb-4">
              {description}
            </p>
          </div>
        );
    }
  };
  
  const handleComplete = () => {
    onComplete();
    onOpenChange(false);
    
    toast({
      title: 'Step Completed',
      description: `You've completed the "${title}" step.`,
    });
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
            {description}
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-4">
          {getActionContent()}
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleComplete}>
            Mark as Completed
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
