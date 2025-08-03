import { Ionicons } from '@expo/vector-icons'
import { Link, Stack } from 'expo-router'
import { ScrollView, Text, View } from 'react-native'
import { useActivities } from '~/hooks/useActivities'

const ACTIVITY_TYPES = [
  {
    id: 'coding',
    title: 'Start Coding',
    icon: 'code-slash',
    href: '/activities/start/coding',
  },
  {
    id: 'gaming',
    title: 'Start Gaming',
    icon: 'game-controller',
    href: '/activities/start/gaming',
  },
  {
    id: 'running',
    title: 'Start Running',
    icon: 'walk',
    href: '/activities/start/running',
  },
]

export default function ActivitiesScreen(): JSX.Element {
  const { activities, loading } = useActivities()

  return (
    <ScrollView className='flex-1 bg-white'>
      <Stack.Screen
        options={{
          title: 'Activities',
          headerLargeTitle: true,
        }}
      />

      <View className='px-4 py-6 flex-row flex-wrap gap-4'>
        {ACTIVITY_TYPES.map((type) => (
          <Link key={type.id} href={type.href} asChild>
            <View className='bg-gray-50 rounded-xl p-4 flex-row items-center w-full'>
              <View className='w-12 h-12 bg-primary-100 rounded-full items-center justify-center mr-4'>
                <Ionicons name={type.icon as keyof typeof Ionicons.glyphMap} size={24} color='#2563eb' />
              </View>
              <Text className='text-base font-medium text-gray-900'>{type.title}</Text>
            </View>
          </Link>
        ))}
      </View>

      <View className='px-4'>
        <Text className='text-lg font-semibold text-gray-900 mb-4'>Recent Activities</Text>
        {activities?.map((activity) => (
          <Link key={activity.activityId} href={`/activities/${activity.activityId}`} asChild>
            <View className='py-4 border-b border-gray-100'>
              <Text className='text-base font-medium text-gray-900'>{activity.category}</Text>
              <Text className='text-sm text-gray-500'>{activity.duration} minutes</Text>
            </View>
          </Link>
        ))}

        {!loading && !activities?.length && (
          <View className='py-12 items-center'>
            <Text className='text-gray-500 text-base'>No activities yet</Text>
          </View>
        )}
      </View>
    </ScrollView>
  )
}
