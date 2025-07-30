// Login Screen

import React, { useState } from 'react';
import { View, Text, SafeAreaView, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { Button, Input, LoadingSpinner } from '../../components/common';
import { useAuth } from '../../hooks/useAuth';
import { validateEmail } from '../../utils/validation';

export const LoginScreen: React.FC = () => {
  const { signIn, loading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  const handleLogin = async () => {
    // Reset errors
    setErrors({});

    // Validate inputs
    const newErrors: { email?: string; password?: string } = {};
    
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!password) {
      newErrors.password = 'Password is required';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      await signIn(email, password);
    } catch (error) {
      Alert.alert('Login Failed', 'Invalid email or password. Please try again.');
    }
  };

  if (loading) {
    return (
      <LoadingSpinner 
        fullScreen 
        message="Signing you in..." 
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
              Welcome Back
            </Text>
            <Text className="text-gray-600 text-center">
              Sign in to continue tracking your activities
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
              placeholder="Enter your password"
              value={password}
              onChangeText={setPassword}
              isPassword
              leftIcon="lock-closed"
              error={errors.password}
            />
          </View>

          <Button
            title="Sign In"
            onPress={handleLogin}
            loading={loading}
            className="mb-4"
          />

          <View className="items-center">
            <Text className="text-gray-600 mb-4">
              Don't have an account?
            </Text>
            <Button
              title="Create Account"
              variant="outline"
              onPress={() => {/* TODO: Navigate to SignUp */}}
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default LoginScreen;