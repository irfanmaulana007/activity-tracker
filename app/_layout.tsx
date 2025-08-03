import { useAuth } from '../hooks/useAuth'
import { Stack } from 'expo-router'
import { ActivityIndicator, View } from 'react-native'
import '~/global.css'

import { type LayoutScreenComponent } from '~/types/component'

export default function RootLayout(): ReturnType<LayoutScreenComponent> {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'white',
        }}>
        <ActivityIndicator size='large' color='#3b82f6' />
      </View>
    )
  }

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: 'white' },
      }}>
      {user ? (
        <Stack.Screen name='(tabs)' />
      ) : (
        <Stack.Screen name='(auth)' />
      )}
    </Stack>
  )
}
