import { Link } from 'expo-router'
import { useState } from 'react'
import { Alert, KeyboardAvoidingView, Platform, SafeAreaView, Text, View } from 'react-native'
import { Button, Input, LoadingSpinner } from '~/components/common'
import { useAuth } from '~/hooks/useAuth'
import { validateEmail } from '~/utils/validation'

export default function SignUpScreen() {
  const { signUp, loading } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({})

  const handleSignUp = async () => {
    setErrors({})

    const newErrors: { email?: string; password?: string } = {}

    if (!email) {
      newErrors.email = 'Email is required'
    } else if (!validateEmail(email)) {
      newErrors.email = 'Please enter a valid email address'
    }

    if (!password) {
      newErrors.password = 'Password is required'
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters'
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    try {
      await signUp(email, password)
    } catch (error) {
      console.error(error)
      Alert.alert('Sign Up Failed', 'Could not create account. Please try again.')
    }
  }

  if (loading) {
    return <LoadingSpinner fullScreen message='Creating your account...' />
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}>
        <View style={{ flex: 1, justifyContent: 'center', paddingHorizontal: 24 }}>
          <View style={{ marginBottom: 32 }}>
            <Text
              style={{
                fontSize: 28,
                fontWeight: 'bold',
                color: '#111827',
                textAlign: 'center',
                marginBottom: 8,
              }}>
              Create Account
            </Text>
            <Text style={{ color: '#4B5563', textAlign: 'center' }}>
              Sign up to start tracking your activities
            </Text>
          </View>

          <View style={{ marginBottom: 24 }}>
            <Input
              label='Email'
              placeholder='Enter your email'
              value={email}
              onChangeText={setEmail}
              keyboardType='email-address'
              autoCapitalize='none'
              autoCorrect={false}
              error={errors.email}
            />

            <Input
              label='Password'
              placeholder='Choose a password'
              value={password}
              onChangeText={setPassword}
              isPassword
              error={errors.password}
            />
          </View>

          <Button
            title='Sign Up'
            onPress={handleSignUp}
            loading={loading}
            style={{ marginBottom: 16 }}
          />

          <View style={{ alignItems: 'center' }}>
            <Text style={{ color: '#4B5563', marginBottom: 16 }}>Already have an account?</Text>
            <Link href='/' asChild>
              <Button title='Sign In' variant='outline' />
            </Link>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}
