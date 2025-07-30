// Forgot Password Screen

import React, { useState } from 'react';
import { View, Text, SafeAreaView, Alert } from 'react-native';
import { Button, Input } from '../../components/common';
import { useAuth } from '../../hooks/useAuth';
import { validateEmail } from '../../utils/validation';

export const ForgotPasswordScreen: React.FC = () => {
  const { resetPassword } = useAuth();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ email?: string }>({});

  const handleResetPassword = async () => {
    // Reset errors
    setErrors({});

    // Validate email
    if (!email) {
      setErrors({ email: 'Email is required' });
      return;
    }

    if (!validateEmail(email)) {
      setErrors({ email: 'Please enter a valid email address' });
      return;
    }

    try {
      setLoading(true);
      await resetPassword(email);
      Alert.alert(
        'Password Reset Sent',
        'Check your email for instructions to reset your password.',
        [{ text: 'OK', onPress: () => {/* TODO: Navigate back to login */} }]
      );
    } catch (error: any) {
      Alert.alert('Error', error.message || 'An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 justify-center px-6">
        <View className="mb-8">
          <Text className="text-3xl font-bold text-gray-900 text-center mb-2">
            Reset Password
          </Text>
          <Text className="text-gray-600 text-center">
            Enter your email address and we'll send you instructions to reset your password
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
        </View>

        <Button
          title="Send Reset Instructions"
          onPress={handleResetPassword}
          loading={loading}
          className="mb-4"
        />

        <View className="items-center">
          <Button
            title="Back to Sign In"
            variant="outline"
            onPress={() => {/* TODO: Navigate back to login */}}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ForgotPasswordScreen;