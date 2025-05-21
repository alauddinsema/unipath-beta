
import React from 'react';
import { BookOpen } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface DegreeFieldsProps {
  degreeType: string;
  fieldOfStudy: string;
  onDegreeChange: (value: string) => void;
  onFieldChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  degreeTypeError?: string;
  fieldOfStudyError?: string;
}

export const DegreeFields: React.FC<DegreeFieldsProps> = ({
  degreeType,
  fieldOfStudy,
  onDegreeChange,
  onFieldChange,
  degreeTypeError,
  fieldOfStudyError,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="space-y-2">
        <Label htmlFor="degreeType">
          Degree Type <span className="text-destructive">*</span>
        </Label>
        <Select 
          value={degreeType || ''} 
          onValueChange={onDegreeChange}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select degree type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="high_school">High School</SelectItem>
            <SelectItem value="associate">Associate's</SelectItem>
            <SelectItem value="bachelor">Bachelor's</SelectItem>
            <SelectItem value="master">Master's</SelectItem>
            <SelectItem value="doctorate">Doctorate</SelectItem>
            <SelectItem value="other">Other</SelectItem>
          </SelectContent>
        </Select>
        {degreeTypeError && (
          <p className="text-sm text-destructive">{degreeTypeError}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="fieldOfStudy">
          Field of Study <span className="text-destructive">*</span>
        </Label>
        <div className="relative">
          <BookOpen className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            id="fieldOfStudy"
            name="fieldOfStudy"
            placeholder="Computer Science"
            className="pl-10"
            value={fieldOfStudy || ''}
            onChange={onFieldChange}
            required
          />
        </div>
        {fieldOfStudyError && (
          <p className="text-sm text-destructive">{fieldOfStudyError}</p>
        )}
      </div>
    </div>
  );
};
