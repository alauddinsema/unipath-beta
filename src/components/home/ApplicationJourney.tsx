
import React from "react";
import { Timeline } from "@/components/ui/timeline";
import { Search, FileText, GraduationCap, CheckCircle } from "lucide-react";

export function ApplicationJourney() {
  const applicationSteps = [
    {
      title: "Step 1: Discover",
      content: (
        <div>
          <p className="text-foreground text-xs md:text-sm font-normal mb-8">
            Start by discovering the right universities that match your profile, preferences, and aspirations. Our advanced search tools help you find the perfect fit.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-lg bg-secondary/20 p-6 border border-secondary/30">
              <Search className="h-8 w-8 text-primary mb-3" />
              <h4 className="text-foreground text-lg font-medium mb-2">Search Universities</h4>
              <p className="text-muted-foreground text-sm">Browse our extensive database of universities with detailed information</p>
            </div>
            <div className="rounded-lg bg-secondary/20 p-6 border border-secondary/30">
              <CheckCircle className="h-8 w-8 text-primary mb-3" />
              <h4 className="text-foreground text-lg font-medium mb-2">Save Favorites</h4>
              <p className="text-muted-foreground text-sm">Keep track of universities you're interested in and take notes</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Step 2: Organize",
      content: (
        <div>
          <p className="text-foreground text-xs md:text-sm font-normal mb-8">
            Keep all your application documents organized in one secure place. Upload transcripts, recommendation letters, and personal statements for easy access.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-lg bg-secondary/20 p-6 border border-secondary/30">
              <FileText className="h-8 w-8 text-primary mb-3" />
              <h4 className="text-foreground text-lg font-medium mb-2">Document Management</h4>
              <p className="text-muted-foreground text-sm">Store and categorize all your application documents securely</p>
            </div>
            <div className="rounded-lg bg-secondary/20 p-6 border border-secondary/30">
              <CheckCircle className="h-8 w-8 text-primary mb-3" />
              <h4 className="text-foreground text-lg font-medium mb-2">Track Requirements</h4>
              <p className="text-muted-foreground text-sm">Keep track of application requirements for each university</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Step 3: Apply",
      content: (
        <div>
          <p className="text-foreground text-xs md:text-sm font-normal mb-8">
            Submit your applications with confidence. Our AI Assistant helps you craft compelling essays and prepare for interviews to maximize your chances of admission.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-lg bg-secondary/20 p-6 border border-secondary/30">
              <GraduationCap className="h-8 w-8 text-primary mb-3" />
              <h4 className="text-foreground text-lg font-medium mb-2">Application Tracking</h4>
              <p className="text-muted-foreground text-sm">Monitor all your applications in one dashboard</p>
            </div>
            <div className="rounded-lg bg-secondary/20 p-6 border border-secondary/30">
              <CheckCircle className="h-8 w-8 text-primary mb-3" />
              <h4 className="text-foreground text-lg font-medium mb-2">Success Rate</h4>
              <p className="text-muted-foreground text-sm">Get insights into your chances of admission at each university</p>
            </div>
          </div>
        </div>
      ),
    },
  ];
  
  return <Timeline data={applicationSteps} />;
}
