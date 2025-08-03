import { Stack } from 'expo-router'
import { Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Card } from '~/components/common'

export default function NewProject() {
  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          title: 'New Project',
        }}
      />
      <SafeAreaView className='flex-1 bg-gray-50'>
        <View className='flex-1 justify-center items-center px-6'>
          <Card className='w-full'>
            <Text className='text-xl font-semibold text-gray-900 text-center mb-2'>
              Create Project
            </Text>
            <Text className='text-gray-600 text-center'>Create a new coding project.</Text>
          </Card>
        </View>
      </SafeAreaView>
    </>
  )
}
