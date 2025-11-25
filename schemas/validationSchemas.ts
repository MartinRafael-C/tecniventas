// schemas/validationSchemas.ts
import { z } from 'zod';

// Define types for the form data
type LoginFormData = z.infer<typeof loginSchema>;
type RegisterFormData = z.infer<typeof registerSchema>;

// Schema para Login
const loginSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
});

// Schema para Registro
const registerSchema = z.object({
  name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Las contraseñas no coinciden",
  path: ["confirmPassword"],
});

// Función de validación para Login
export const validateLogin = (formData: LoginFormData): Record<string, string> => {
  try {
    loginSchema.parse(formData);
    return {}; // Sin errores
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errors: Record<string, string> = {};
      error.issues.forEach((err) => {
        if (typeof err.path[0] === 'string') {
          errors[err.path[0]] = err.message;
        }
      });
      return errors;
    }
    return {};
  }
};

// Función de validación para Registro
export const validateRegister = (formData: RegisterFormData): Record<string, string> => {
  try {
    registerSchema.parse(formData);
    return {}; // Sin errores
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errors: Record<string, string> = {};
      error.issues.forEach((err) => {
        if (typeof err.path[0] === 'string') {
          errors[err.path[0]] = err.message;
        }
      });
      return errors;
    }
    return {};
  }
};
