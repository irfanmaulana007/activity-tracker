import { Ionicons } from '@expo/vector-icons'
import { Tabs } from 'expo-router'

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
        name='(home)'
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => <Ionicons name='home' size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name='activities'
        options={{
          title: 'Activities',
          tabBarIcon: ({ color, size }) => <Ionicons name='list' size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name='projects'
        options={{
          title: 'Projects',
          tabBarIcon: ({ color, size }) => <Ionicons name='folder' size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name='profile'
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, size }) => <Ionicons name='person' size={size} color={color} />,
        }}
      />
    </Tabs>
  )
}
