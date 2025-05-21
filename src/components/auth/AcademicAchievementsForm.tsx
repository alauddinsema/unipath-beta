
import React, { useState, useEffect } from 'react';
import { InstitutionField } from './academic-form/InstitutionField';
import { DegreeFields } from './academic-form/DegreeFields';
import { DateFields } from './academic-form/DateFields';
import { GpaField } from './academic-form/GpaField';
import { AchievementsInput } from './academic-form/AchievementsInput';

type AcademicAchievementsFormProps = {
  formData: {
    institutionName?: string;
    degreeType?: string;
    fieldOfStudy?: string;
    startDate?: string;
    endDate?: string;
    achievements?: string[];
    gpa?: string;
  };
  errors: {
    institutionName?: string;
    degreeType?: string;
    fieldOfStudy?: string;
    startDate?: string;
    endDate?: string;
    achievements?: string;
    gpa?: string;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleSelectChange: (name: string, value: string) => void;
};

export const AcademicAchievementsForm: React.FC<AcademicAchievementsFormProps> = ({
  formData,
  errors,
  handleChange,
  handleSelectChange,
}) => {
  const [achievements, setAchievements] = useState<string[]>(formData.achievements || []);

  // Update local achievements when formData changes (for resets/rehydration)
  useEffect(() => {
    if (formData.achievements) {
      setAchievements(formData.achievements);
    }
  }, [formData.achievements]);

  const addAchievement = (newAchievement: string) => {
    if (newAchievement.trim()) {
      const updatedAchievements = [...achievements, newAchievement.trim()];
      setAchievements(updatedAchievements);
      // Update parent form data directly without creating synthetic events
      handleSelectChange('achievements', JSON.stringify(updatedAchievements));
    }
  };

  const removeAchievement = (index: number) => {
    const updatedAchievements = achievements.filter((_, i) => i !== index);
    setAchievements(updatedAchievements);
    // Update parent form data directly without creating synthetic events
    handleSelectChange('achievements', JSON.stringify(updatedAchievements));
  };

  const handleDegreeTypeChange = (value: string) => {
    handleSelectChange('degreeType', value);
  };

  return (
    <div className="space-y-4">
      <InstitutionField 
        value={formData.institutionName || ''} 
        onChange={handleChange}
        error={errors.institutionName}
      />

      <DegreeFields 
        degreeType={formData.degreeType || ''}
        fieldOfStudy={formData.fieldOfStudy || ''}
        onDegreeChange={handleDegreeTypeChange}
        onFieldChange={handleChange}
        degreeTypeError={errors.degreeType}
        fieldOfStudyError={errors.fieldOfStudy}
      />

      <DateFields 
        startDate={formData.startDate || ''}
        endDate={formData.endDate || ''}
        onChange={handleChange}
        startDateError={errors.startDate}
        endDateError={errors.endDate}
      />

      <GpaField 
        value={formData.gpa || ''}
        onChange={handleChange}
        error={errors.gpa}
      />

      <AchievementsInput 
        achievements={achievements}
        onAddAchievement={addAchievement}
        onRemoveAchievement={removeAchievement}
      />
    </div>
  );
};
