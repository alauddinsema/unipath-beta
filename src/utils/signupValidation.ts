
import { z } from 'zod';

// Validation schema
export const signupSchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string(),
  gpa: z.string().refine(val => {
    const num = parseFloat(val);
    return !isNaN(num) && num >= 0 && num <= 4.0;
  }, "GPA must be between 0.0 and 4.0"),
  satScore: z.string().refine(val => {
    if (!val) return true; // Optional field
    const num = parseInt(val);
    return !isNaN(num) && num >= 400 && num <= 1600;
  }, "SAT score must be between 400 and 1600"),
  ieltsScore: z.string().refine(val => {
    if (!val) return true; // Optional field
    const num = parseFloat(val);
    return !isNaN(num) && num >= 1.0 && num <= 9.0;
  }, "IELTS score must be between 1.0 and 9.0")
})
.refine(data => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export type SignupFormData = z.infer<typeof signupSchema>;

export const validateAccountStep = (formData: Partial<SignupFormData>) => {
  try {
    const { fullName, email, password, confirmPassword } = formData;
    const partialSchema = z.object({
      fullName: z.string().min(2, "Full name is required"),
      email: z.string().email("Please enter a valid email"),
      password: z.string().min(6, "Password must be at least 6 characters"),
      confirmPassword: z.string()
    }).refine(data => data.password === data.confirmPassword, {
      message: "Passwords don't match",
      path: ["confirmPassword"],
    });
    
    partialSchema.parse({ fullName, email, password, confirmPassword });
    return { valid: true, errors: {} };
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errors: Record<string, string> = {};
      error.errors.forEach(err => {
        if (err.path.length > 0) {
          errors[err.path[0]] = err.message;
        }
      });
      return { valid: false, errors };
    }
    return { valid: false, errors: { form: "Validation error occurred" } };
  }
};

export const validateAcademicStep = (formData: Partial<SignupFormData>) => {
  try {
    const { gpa, satScore, ieltsScore } = formData;
    const academicSchema = z.object({
      gpa: z.string().refine(val => {
        const num = parseFloat(val || "");
        return !isNaN(num) && num >= 0 && num <= 4.0;
      }, "GPA must be between 0.0 and 4.0"),
      satScore: z.string().optional().refine(val => {
        if (!val) return true;
        const num = parseInt(val);
        return !isNaN(num) && num >= 400 && num <= 1600;
      }, "SAT score must be between 400 and 1600"),
      ieltsScore: z.string().optional().refine(val => {
        if (!val) return true;
        const num = parseFloat(val);
        return !isNaN(num) && num >= 1.0 && num <= 9.0;
      }, "IELTS score must be between 1.0 and 9.0")
    });
    
    academicSchema.parse({ gpa, satScore, ieltsScore });
    return { valid: true, errors: {} };
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errors: Record<string, string> = {};
      error.errors.forEach(err => {
        if (err.path.length > 0) {
          errors[err.path[0]] = err.message;
        }
      });
      return { valid: false, errors };
    }
    return { valid: false, errors: { form: "Validation error occurred" } };
  }
};
