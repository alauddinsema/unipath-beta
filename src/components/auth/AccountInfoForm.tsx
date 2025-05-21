
import React from 'react';
import { Mail, Lock, User } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

type AccountInfoFormProps = {
  formData: {
    fullName?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
    gender?: 'male' | 'female' | 'other';
  };
  errors: {
    fullName?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
    gender?: string;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSelectChange: (name: string, value: string) => void;
};

export const AccountInfoForm: React.FC<AccountInfoFormProps> = ({
  formData,
  errors,
  handleChange,
  handleSelectChange,
}) => {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="fullName">Full Name <span className="text-destructive">*</span></Label>
        <div className="relative">
          <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            id="fullName"
            name="fullName"
            placeholder="John Doe"
            className="pl-10"
            value={formData.fullName || ''}
            onChange={handleChange}
            required
          />
        </div>
        {errors.fullName && (
          <p className="text-sm text-destructive">{errors.fullName}</p>
        )}
      </div>
      
      <div className="space-y-2">
        <Label>Gender</Label>
        <RadioGroup
          defaultValue={formData.gender}
          onValueChange={(value) => handleSelectChange('gender', value)}
          className="flex flex-col space-y-2"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="male" id="male" />
            <Label htmlFor="male" className="cursor-pointer">Male</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="female" id="female" />
            <Label htmlFor="female" className="cursor-pointer">Female</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="other" id="other" />
            <Label htmlFor="other" className="cursor-pointer">Other</Label>
          </div>
        </RadioGroup>
        {errors.gender && (
          <p className="text-sm text-destructive">{errors.gender}</p>
        )}
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="email">Email <span className="text-destructive">*</span></Label>
        <div className="relative">
          <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="your.email@example.com"
            className="pl-10"
            value={formData.email || ''}
            onChange={handleChange}
            required
          />
        </div>
        {errors.email && (
          <p className="text-sm text-destructive">{errors.email}</p>
        )}
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="password">Password <span className="text-destructive">*</span></Label>
        <div className="relative">
          <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="••••••••"
            className="pl-10"
            value={formData.password || ''}
            onChange={handleChange}
            required
          />
        </div>
        {errors.password && (
          <p className="text-sm text-destructive">{errors.password}</p>
        )}
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="confirmPassword">Confirm Password <span className="text-destructive">*</span></Label>
        <div className="relative">
          <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            placeholder="••••••••"
            className="pl-10"
            value={formData.confirmPassword || ''}
            onChange={handleChange}
            required
          />
        </div>
        {errors.confirmPassword && (
          <p className="text-sm text-destructive">{errors.confirmPassword}</p>
        )}
      </div>
    </div>
  );
};
