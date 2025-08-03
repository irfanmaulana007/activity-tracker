import { Stack, router, useLocalSearchParams } from 'expo-router'
import { ScrollView, Text, View } from 'react-native'
import { Button } from '~/components/common'
import { useActivities } from '~/hooks/useActivities'

export default function ActivityDetailScreen() {
  const { id } = useLocalSearchParams()
  const { activities, deleteActivity } = useActivities()
  const activity = activities.find((activity) => activity.activityId === id)

  const handleDelete = async () => {
    await deleteActivity(id as string)
    router.back()
  }

  if (!activity) {
    return (
      <>
        <Stack.Screen
          options={{
            headerShown: true,
            title: 'Not Found',
          }}
        />
        <View className='flex-1 justify-center items-center bg-white'>
          <Text className='text-gray-500 text-base'>Activity not found</Text>
        </View>
      </>
    )
  }

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          title: activity.category,
        }}
      />

      <ScrollView className='flex-1 bg-white px-4'>
        <View className='py-4'>
          <Text className='text-xl font-semibold text-gray-900 mb-2'>{activity.category}</Text>
          <Text className='text-base text-gray-500 mb-4'>
            Duration: {activity.duration} minutes
          </Text>

          <Text className='text-base text-gray-700 mb-6'>{activity.category}</Text>

          <Button title='Delete Activity' variant='danger' onPress={handleDelete} />
        </View>
      </ScrollView>
    </>
  )
}
