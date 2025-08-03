import { cn } from '../../utils/cn'
import React, { useState } from 'react'
import { Text, TextInput, TextInputProps, TouchableOpacity, View } from 'react-native'

interface InputProps extends TextInputProps {
  label?: string
  error?: string
  isPassword?: boolean
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  isPassword = false,
  className,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false)
  const hasError = !!error

  return (
    <View className='mb-5'>
      {label && (
        <Text className='text-gray-800 text-sm font-medium mb-2 tracking-wide'>{label}</Text>
      )}

      <View
        className={cn(
          'flex-row items-center border-b',
          hasError ? 'border-red-500' : 'border-gray-200',
        )}>
        <TextInput
          className={cn('flex-1 text-gray-800 text-base py-2 px-0', className)}
          placeholderTextColor='#9ca3af'
          secureTextEntry={isPassword && !showPassword}
          {...props}
        />

        {isPassword && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)} className='p-2'>
            <Text className='text-gray-500 text-sm'>{showPassword ? 'Hide' : 'Show'}</Text>
          </TouchableOpacity>
        )}
      </View>

      {error && <Text className='text-red-500 text-xs mt-1'>{error}</Text>}
    </View>
  )
}
