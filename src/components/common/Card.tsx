// Custom Card Component

import React from 'react';
import { View, TouchableOpacity, ViewProps, TouchableOpacityProps } from 'react-native';

interface CardProps extends ViewProps {
  variant?: 'default' | 'elevated' | 'outlined';
  padding?: 'none' | 'small' | 'medium' | 'large';
  onPress?: () => void;
}

export const Card: React.FC<CardProps> = ({
  children,
  variant = 'default',
  padding = 'medium',
  onPress,
  style,
  ...props
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'elevated':
        return 'bg-white shadow-lg shadow-gray-200/50';
      case 'outlined':
        return 'bg-white border border-gray-200';
      default:
        return 'bg-white shadow-sm shadow-gray-200/30';
    }
  };

  const getPaddingStyles = () => {
    switch (padding) {
      case 'none':
        return '';
      case 'small':
        return 'p-3';
      case 'large':
        return 'p-6';
      default:
        return 'p-4';
    }
  };

  const cardStyles = `
    rounded-xl
    ${getVariantStyles()}
    ${getPaddingStyles()}
  `;

  if (onPress) {
    return (
      <TouchableOpacity
        className={`${cardStyles} active:opacity-70`}
        style={style}
        onPress={onPress}
        {...props as TouchableOpacityProps}
      >
        {children}
      </TouchableOpacity>
    );
  }

  return (
    <View className={cardStyles} style={style} {...props}>
      {children}
    </View>
  );
};