// Validation Utilities

import { FormError, ValidationResult } from '../types';

// Email validation
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Password validation
export const validatePassword = (password: string): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];
  
  if (password.length < 6) {
    errors.push('Password must be at least 6 characters long');
  }
  
  if (!/(?=.*[a-z])/.test(password)) {
    errors.push('Password must contain at least one lowercase letter');
  }
  
  if (!/(?=.*[A-Z])/.test(password)) {
    errors.push('Password must contain at least one uppercase letter');
  }
  
  if (!/(?=.*\d)/.test(password)) {
    errors.push('Password must contain at least one number');
  }
  
  return {
    isValid: errors.length === 0,
    errors,
  };
};

// Project name validation
export const validateProjectName = (name: string): ValidationResult => {
  const errors: FormError[] = [];
  
  if (!name.trim()) {
    errors.push({ field: 'name', message: 'Project name is required' });
  } else if (name.trim().length < 2) {
    errors.push({ field: 'name', message: 'Project name must be at least 2 characters' });
  } else if (name.trim().length > 50) {
    errors.push({ field: 'name', message: 'Project name must be less than 50 characters' });
  }
  
  return {
    isValid: errors.length === 0,
    errors,
  };
};

// Game name validation
export const validateGameName = (name: string): ValidationResult => {
  const errors: FormError[] = [];
  
  if (!name.trim()) {
    errors.push({ field: 'name', message: 'Game name is required' });
  } else if (name.trim().length < 2) {
    errors.push({ field: 'name', message: 'Game name must be at least 2 characters' });
  } else if (name.trim().length > 50) {
    errors.push({ field: 'name', message: 'Game name must be less than 50 characters' });
  }
  
  return {
    isValid: errors.length === 0,
    errors,
  };
};

// Programming language validation
export const validateProgrammingLanguage = (language: string): ValidationResult => {
  const errors: FormError[] = [];
  
  if (!language.trim()) {
    errors.push({ field: 'language', message: 'Programming language is required' });
  }
  
  return {
    isValid: errors.length === 0,
    errors,
  };
};

// Sports activity validation
export const validateDistance = (distance: number | undefined): ValidationResult => {
  const errors: FormError[] = [];
  
  if (distance !== undefined) {
    if (distance <= 0) {
      errors.push({ field: 'distance', message: 'Distance must be greater than 0' });
    } else if (distance > 1000) {
      errors.push({ field: 'distance', message: 'Distance must be less than 1000 km' });
    }
  }
  
  return {
    isValid: errors.length === 0,
    errors,
  };
};

export const validateHeartRate = (heartRate: number | undefined, fieldName: string): ValidationResult => {
  const errors: FormError[] = [];
  
  if (heartRate !== undefined) {
    if (heartRate < 40 || heartRate > 220) {
      errors.push({ field: fieldName, message: 'Heart rate must be between 40 and 220 BPM' });
    }
  }
  
  return {
    isValid: errors.length === 0,
    errors,
  };
};

// Generic form validation helper
export const combineValidationResults = (...results: ValidationResult[]): ValidationResult => {
  const allErrors = results.flatMap(result => result.errors);
  
  return {
    isValid: allErrors.length === 0,
    errors: allErrors,
  };
};