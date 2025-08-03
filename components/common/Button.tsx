import { cn } from '../../utils/cn'
import React from 'react'
import { ActivityIndicator, Text, TouchableOpacity, TouchableOpacityProps } from 'react-native'

interface ButtonProps extends TouchableOpacityProps {
  title: string
  variant?: 'primary' | 'secondary' | 'outline' | 'danger'
  size?: 'small' | 'medium' | 'large'
  loading?: boolean
  disabled?: boolean
}

const variantStyles = {
  primary: 'bg-primary-500 active:bg-primary-600',
  secondary: 'bg-secondary-500 active:bg-secondary-600',
  outline: 'bg-transparent border-2 border-primary-500 active:bg-primary-50',
  danger: 'bg-red-500 active:bg-red-600',
} as const

const sizeStyles = {
  small: 'px-3 py-2',
  medium: 'px-6 py-3',
  large: 'px-8 py-4',
} as const

const textSizeStyles = {
  small: 'text-sm',
  medium: 'text-base',
  large: 'text-lg',
} as const

export const Button: React.FC<ButtonProps> = ({
  title,
  variant = 'primary',
  size = 'medium',
  loading = false,
  disabled = false,
  className,
  style,
  ...props
}) => {
  const isDisabled = disabled || loading

  return (
    <TouchableOpacity
      className={cn(
        'rounded-lg items-center justify-center',
        variantStyles[variant],
        sizeStyles[size],
        isDisabled && 'opacity-50',
        className,
      )}
      style={style}
      disabled={isDisabled}
      {...props}>
      {loading ? (
        <ActivityIndicator color={variant === 'outline' ? '#2563eb' : 'white'} size='small' />
      ) : (
        <Text
          className={cn(
            'font-semibold text-center',
            textSizeStyles[size],
            variant === 'outline' ? 'text-primary-500' : 'text-white',
          )}>
          {title}
        </Text>
      )}
    </TouchableOpacity>
  )
}
