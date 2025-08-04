import { Link } from 'expo-router'
import { Code, Gamepad, HeartHandshake } from 'lucide-react-native'
import { ScrollView, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useActivities } from '~/hooks/useActivities'
import { formatTimeHuman } from '~/utils/time'

const ACTIVITY_TYPES = [
  {
    id: 'coding',
    title: 'Start Coding',
    href: '/activities/start/coding',
  },
  {
    id: 'gaming',
    title: 'Start Gaming',
    href: '/activities/start/gaming',
  },
  {
    id: 'running',
    title: 'Start Running',
    href: '/activities/start/running',
  },
]

export default function ActivitiesScreen() {
  const { activities, loading } = useActivities()

  return (
    <SafeAreaView className='flex-1 bg-white'>
      <ScrollView className='flex-1 bg-white'>
        <View className='px-4 py-6 flex-row flex-wrap gap-4'>
          {ACTIVITY_TYPES.map((type) => (
            <Link key={type.id} href={type.href} asChild>
              <View className='bg-gray-50 rounded-xl p-4 flex-row items-center w-full'>
                <View className='w-12 h-12 bg-primary-100 rounded-full items-center justify-center mr-4'>
                  {type.id === 'coding' && <Code size={24} color='#2563eb' />}
                  {type.id === 'gaming' && <Gamepad size={24} color='#10b981' />}
                  {type.id === 'running' && <HeartHandshake size={24} color='#f59e0b' />}
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
                <Text className='text-sm text-gray-500'>
                  {formatTimeHuman(activity.duration)}
                </Text>
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
    </SafeAreaView>
  )
}
