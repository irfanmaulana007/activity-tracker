import { Stack } from 'expo-router'
import '~/global.css'
import { type LayoutScreenComponent } from '~/types/component'

export default function RootLayout(): ReturnType<LayoutScreenComponent> {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: 'white' },
      }}>
      <Stack.Screen name='(tabs)' />
    </Stack>
  )
}
