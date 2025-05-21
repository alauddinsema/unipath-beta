
import React from 'react';
import { GraduationCap, BookOpen, Languages } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

type AcademicInfoFormProps = {
  formData: {
    gpa?: string;
    satScore?: string;
    ieltsScore?: string;
    degreeType?: string;
    fieldOfStudy?: string;
  };
  errors: {
    gpa?: string;
    satScore?: string;
    ieltsScore?: string;
    degreeType?: string;
    fieldOfStudy?: string;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSelectChange: (name: string, value: string) => void;
};

export const AcademicInfoForm: React.FC<AcademicInfoFormProps> = ({
  formData,
  errors,
  handleChange,
  handleSelectChange,
}) => {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <Label htmlFor="gpa">
          GPA (0.0 - 4.0) <span className="text-destructive">*</span>
        </Label>
        <div className="relative">
          <GraduationCap className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            id="gpa"
            name="gpa"
            type="number"
            step="0.01"
            min="0"
            max="4.0"
            placeholder="3.5"
            className="pl-10"
            value={formData.gpa || ''}
            onChange={handleChange}
            required
          />
        </div>
        {errors.gpa && (
          <p className="text-sm text-destructive">{errors.gpa}</p>
        )}
      </div>
      
      <div className="space-y-4">
        <Label htmlFor="satScore">
          SAT Score (400 - 1600) <span className="text-muted-foreground text-sm">(optional)</span>
        </Label>
        <div className="relative">
          <BookOpen className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            id="satScore"
            name="satScore"
            type="number"
            min="400"
            max="1600"
            step="10"
            placeholder="1200"
            className="pl-10"
            value={formData.satScore || ''}
            onChange={handleChange}
          />
        </div>
        {errors.satScore && (
          <p className="text-sm text-destructive">{errors.satScore}</p>
        )}
      </div>
      
      <div className="space-y-4">
        <Label htmlFor="ieltsScore">
          IELTS Score (1.0 - 9.0) <span className="text-muted-foreground text-sm">(optional)</span>
        </Label>
        <div className="relative">
          <Languages className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            id="ieltsScore"
            name="ieltsScore"
            type="number"
            min="1.0"
            max="9.0"
            step="0.5"
            placeholder="7.5"
            className="pl-10"
            value={formData.ieltsScore || ''}
            onChange={handleChange}
          />
        </div>
        {errors.ieltsScore && (
          <p className="text-sm text-destructive">{errors.ieltsScore}</p>
        )}
      </div>
      
      <div className="space-y-4">
        <Label htmlFor="degreeType">
          Degree Type <span className="text-destructive">*</span>
        </Label>
        <Select 
          value={formData.degreeType || ''} 
          onValueChange={(value) => handleSelectChange('degreeType', value)}
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
        {errors.degreeType && (
          <p className="text-sm text-destructive">{errors.degreeType}</p>
        )}
      </div>
      
      <div className="space-y-4">
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
            value={formData.fieldOfStudy || ''}
            onChange={handleChange}
            required
          />
        </div>
        {errors.fieldOfStudy && (
          <p className="text-sm text-destructive">{errors.fieldOfStudy}</p>
        )}
      </div>
    </div>
  );
};
