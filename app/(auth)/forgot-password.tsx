import { Link, router } from 'expo-router'
import { useState } from 'react'
import { Alert, KeyboardAvoidingView, Platform, SafeAreaView, Text, View } from 'react-native'
import { Button, Input, LoadingSpinner } from '~/components/common'
import { useAuth } from '~/hooks/useAuth'
import { validateEmail } from '~/utils/validation'

export default function ForgotPasswordScreen() {
  const { resetPassword, loading } = useAuth()
  const [email, setEmail] = useState('')
  const [error, setError] = useState<string>()

  const handleResetPassword = async () => {
    setError(undefined)

    if (!email) {
      setError('Email is required')
      return
    }

    if (!validateEmail(email)) {
      setError('Please enter a valid email address')
      return
    }

    try {
      await resetPassword(email)
      Alert.alert(
        'Check Your Email',
        'We have sent you an email with instructions to reset your password.',
        [{ text: 'OK', onPress: () => router.back() }],
      )
    } catch (error) {
      console.error(error)
      Alert.alert('Error', 'Could not send reset email. Please try again.')
    }
  }

  if (loading) {
    return <LoadingSpinner fullScreen message='Sending reset instructions...' />
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
              Reset Password
            </Text>
            <Text style={{ color: '#4B5563', textAlign: 'center' }}>
              Enter your email to receive reset instructions
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
              error={error}
            />
          </View>

          <Button
            title='Send Reset Instructions'
            onPress={handleResetPassword}
            loading={loading}
            style={{ marginBottom: 16 }}
          />

          <View style={{ alignItems: 'center' }}>
            <Text style={{ color: '#4B5563', marginBottom: 16 }}>Remember your password?</Text>
            <Link href='/' asChild>
              <Button title='Back to Sign In' variant='outline' />
            </Link>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}
