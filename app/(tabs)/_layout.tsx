import { Tabs } from 'expo-router'
import { CircleDot, Home, List, User } from 'lucide-react-native'
import { type ScreenComponent } from '~/types/component'

export default function TabsLayout(): ReturnType<ScreenComponent> {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: 'white',
          borderTopColor: '#e5e7eb',
        },
        tabBarActiveTintColor: '#2563eb',
        tabBarInactiveTintColor: '#6b7280',
      }}>
      <Tabs.Screen
        name='(home)/index'
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => <Home size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name='activities'
        options={{
          title: 'Activities',
          tabBarIcon: ({ color, size }) => <List size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name='track'
        options={{
          title: 'Track',
          tabBarIcon: ({ color, size }) => <CircleDot size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name='profile/index'
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, size }) => <User size={size} color={color} />,
        }}
      />
    </Tabs>
  )
}
