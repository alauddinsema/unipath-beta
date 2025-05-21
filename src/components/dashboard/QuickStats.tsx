
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { School, Calendar, CheckCircle, Clock } from 'lucide-react';

interface StatsCardProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
}

const StatsCard = ({ icon, label, value }: StatsCardProps) => (
  <Card>
    <CardContent className="flex items-center p-6">
      <div className="rounded-full bg-primary/10 p-3 mr-4">
        {icon}
      </div>
      <div>
        <p className="text-sm text-muted-foreground">{label}</p>
        <h3 className="text-2xl font-bold">{value}</h3>
      </div>
    </CardContent>
  </Card>
);

export function QuickStats() {
  // Initialize all stats to zero for new users
  return (
    <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
      <StatsCard 
        icon={<School className="h-5 w-5 text-primary" />}
        label="Total Applications"
        value={0}
      />
      <StatsCard 
        icon={<CheckCircle className="h-5 w-5 text-primary" />}
        label="Completed"
        value={0}
      />
      <StatsCard 
        icon={<Clock className="h-5 w-5 text-primary" />}
        label="In Progress"
        value={0}
      />
      <StatsCard 
        icon={<Calendar className="h-5 w-5 text-primary" />}
        label="Upcoming Deadlines"
        value={0}
      />
    </div>
  );
}
