import { Link, Stack } from 'expo-router'
import { Code } from 'lucide-react-native'
import { ScrollView, Text, View } from 'react-native'

const PROJECT_TYPES = [
  {
    id: 'coding',
    title: 'Coding Projects',
    href: '/projects/coding',
  },
  {
    id: 'gaming',
    title: 'Gaming Library',
    href: '/projects/gaming',
  },
]

export default function ProjectsScreen() {
  return (
    <ScrollView className='flex-1 bg-white'>
      <Stack.Screen
        options={{
          title: 'Projects',
          headerLargeTitle: true,
        }}
      />

      <View className='px-4 py-6 flex-row flex-wrap gap-4'>
        {PROJECT_TYPES.map((type) => (
          <Link key={type.id} href={type.href} asChild>
            <View className='bg-gray-50 rounded-xl p-4 flex-row items-center w-full'>
              <View className='w-12 h-12 bg-primary-100 rounded-full items-center justify-center mr-4'>
                <Code size={24} color='#2563eb' />
              </View>
              <Text className='text-base font-medium text-gray-900'>{type.title}</Text>
            </View>
          </Link>
        ))}
      </View>
    </ScrollView>
  )
}
