// Custom Input Component

import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, TextInputProps } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  helperText?: string;
  isPassword?: boolean;
  leftIcon?: keyof typeof Ionicons.glyphMap;
  rightIcon?: keyof typeof Ionicons.glyphMap;
  onRightIconPress?: () => void;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  helperText,
  isPassword = false,
  leftIcon,
  rightIcon,
  onRightIconPress,
  style,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const hasError = !!error;

  return (
    <View className="mb-4">
      {label && (
        <Text className="text-gray-700 text-sm font-medium mb-2">{label}</Text>
      )}
      
      <View className={`
        flex-row items-center bg-white border rounded-lg px-3 py-3
        ${hasError ? 'border-red-500' : 'border-gray-300'}
        ${props.editable === false ? 'bg-gray-100' : ''}
      `}>
        {leftIcon && (
          <Ionicons
            name={leftIcon}
            size={20}
            color={hasError ? '#ef4444' : '#6b7280'}
            style={{ marginRight: 8 }}
          />
        )}
        
        <TextInput
          className="flex-1 text-gray-900 text-base"
          placeholderTextColor="#9ca3af"
          secureTextEntry={isPassword && !showPassword}
          style={style}
          {...props}
        />
        
        {isPassword && (
          <TouchableOpacity onPress={togglePasswordVisibility}>
            <Ionicons
              name={showPassword ? 'eye-off' : 'eye'}
              size={20}
              color="#6b7280"
            />
          </TouchableOpacity>
        )}
        
        {rightIcon && !isPassword && (
          <TouchableOpacity onPress={onRightIconPress}>
            <Ionicons
              name={rightIcon}
              size={20}
              color={hasError ? '#ef4444' : '#6b7280'}
            />
          </TouchableOpacity>
        )}
      </View>
      
      {error && (
        <Text className="text-red-500 text-sm mt-1">{error}</Text>
      )}
      
      {helperText && !error && (
        <Text className="text-gray-500 text-sm mt-1">{helperText}</Text>
      )}
    </View>
  );
};