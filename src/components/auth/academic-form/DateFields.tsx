
import React from 'react';
import { Calendar } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface DateFieldsProps {
  startDate: string;
  endDate: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  startDateError?: string;
  endDateError?: string;
}

export const DateFields: React.FC<DateFieldsProps> = ({
  startDate,
  endDate,
  onChange,
  startDateError,
  endDateError,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="space-y-2">
        <Label htmlFor="startDate">
          Start Date <span className="text-destructive">*</span>
        </Label>
        <div className="relative">
          <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            id="startDate"
            name="startDate"
            type="date"
            className="pl-10"
            value={startDate || ''}
            onChange={onChange}
            required
          />
        </div>
        {startDateError && (
          <p className="text-sm text-destructive">{startDateError}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="endDate">
          End Date <span className="text-muted-foreground text-sm">(or expected)</span>
        </Label>
        <div className="relative">
          <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            id="endDate"
            name="endDate"
            type="date"
            className="pl-10"
            value={endDate || ''}
            onChange={onChange}
          />
        </div>
        {endDateError && (
          <p className="text-sm text-destructive">{endDateError}</p>
        )}
      </div>
    </div>
  );
};
