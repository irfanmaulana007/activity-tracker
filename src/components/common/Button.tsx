// Custom Button Component

import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator, TouchableOpacityProps } from 'react-native';

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'danger';
  size?: 'small' | 'medium' | 'large';
  loading?: boolean;
  disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  variant = 'primary',
  size = 'medium',
  loading = false,
  disabled = false,
  style,
  ...props
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'secondary':
        return 'bg-secondary-500 active:bg-secondary-600';
      case 'outline':
        return 'bg-transparent border-2 border-primary-500 active:bg-primary-50';
      case 'danger':
        return 'bg-red-500 active:bg-red-600';
      default:
        return 'bg-primary-500 active:bg-primary-600';
    }
  };

  const getSizeStyles = () => {
    switch (size) {
      case 'small':
        return 'px-3 py-2';
      case 'large':
        return 'px-8 py-4';
      default:
        return 'px-6 py-3';
    }
  };

  const getTextStyles = () => {
    const baseStyles = 'font-semibold text-center';
    const sizeStyles = size === 'small' ? 'text-sm' : size === 'large' ? 'text-lg' : 'text-base';
    const colorStyles = variant === 'outline' ? 'text-primary-500' : 'text-white';
    return `${baseStyles} ${sizeStyles} ${colorStyles}`;
  };

  const isDisabled = disabled || loading;

  return (
    <TouchableOpacity
      className={`
        rounded-lg items-center justify-center
        ${getVariantStyles()}
        ${getSizeStyles()}
        ${isDisabled ? 'opacity-50' : ''}
      `}
      style={style}
      disabled={isDisabled}
      {...props}
    >
      {loading ? (
        <ActivityIndicator color={variant === 'outline' ? '#3b82f6' : 'white'} size="small" />
      ) : (
        <Text className={getTextStyles()}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};