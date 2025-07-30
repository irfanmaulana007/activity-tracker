// Sign Up Screen

import React, { useState } from 'react';
import { View, Text, SafeAreaView, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { Button, Input, LoadingSpinner } from '../../components/common';
import { useAuth } from '../../hooks/useAuth';
import { validateEmail, validatePassword } from '../../utils/validation';

export const SignUpScreen: React.FC = () => {
  const { signUp, loading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState<{ 
    email?: string; 
    password?: string; 
    confirmPassword?: string; 
  }>({});

  const handleSignUp = async () => {
    // Reset errors
    setErrors({});

    // Validate inputs
    const newErrors: { 
      email?: string; 
      password?: string; 
      confirmPassword?: string; 
    } = {};
    
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!password) {
      newErrors.password = 'Password is required';
    } else {
      const passwordValidation = validatePassword(password);
      if (!passwordValidation.isValid) {
        newErrors.password = passwordValidation.errors[0];
      }
    }
    
    if (!confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      await signUp(email, password);
    } catch (error: any) {
      Alert.alert('Sign Up Failed', error.message || 'An error occurred. Please try again.');
    }
  };

  if (loading) {
    return (
      <LoadingSpinner 
        fullScreen 
        message="Creating your account..." 
      />
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView 
        className="flex-1"
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View className="flex-1 justify-center px-6">
          <View className="mb-8">
            <Text className="text-3xl font-bold text-gray-900 text-center mb-2">
              Create Account
            </Text>
            <Text className="text-gray-600 text-center">
              Start tracking your productivity activities
            </Text>
          </View>

          <View className="mb-6">
            <Input
              label="Email"
              placeholder="Enter your email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              leftIcon="mail"
              error={errors.email}
            />

            <Input
              label="Password"
              placeholder="Create a password"
              value={password}
              onChangeText={setPassword}
              isPassword
              leftIcon="lock-closed"
              error={errors.password}
              helperText="Must be at least 6 characters with uppercase, lowercase, and number"
            />

            <Input
              label="Confirm Password"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              isPassword
              leftIcon="lock-closed"
              error={errors.confirmPassword}
            />
          </View>

          <Button
            title="Create Account"
            onPress={handleSignUp}
            loading={loading}
            className="mb-4"
          />

          <View className="items-center">
            <Text className="text-gray-600 mb-4">
              Already have an account?
            </Text>
            <Button
              title="Sign In"
              variant="outline"
              onPress={() => {/* TODO: Navigate to Login */}}
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SignUpScreen;