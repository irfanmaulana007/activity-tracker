// Loading Spinner Component

import React from 'react';
import { View, ActivityIndicator, Text } from 'react-native';

interface LoadingSpinnerProps {
  size?: 'small' | 'large';
  color?: string;
  message?: string;
  fullScreen?: boolean;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'large',
  color = '#3b82f6',
  message,
  fullScreen = false,
}) => {
  const containerClass = fullScreen
    ? 'flex-1 justify-center items-center bg-white'
    : 'justify-center items-center py-8';

  return (
    <View className={containerClass}>
      <ActivityIndicator size={size} color={color} />
      {message && (
        <Text className="text-gray-600 text-base mt-4 text-center">
          {message}
        </Text>
      )}
    </View>
  );
};