import { Stack, useLocalSearchParams } from 'expo-router'
import { Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Card } from '~/components/common'

export default function ProjectDetail() {
  const { id } = useLocalSearchParams<{ id: string }>()
  console.log('🔍 ~ ProjectDetail ~ app/(tabs)/projects/[id]/index.tsx:7 ~ id:', id)

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          title: 'Project Details',
        }}
      />
      <SafeAreaView className='flex-1 bg-gray-50'>
        <View className='flex-1 justify-center items-center px-6'>
          <Card className='w-full'>
            <Text className='text-xl font-semibold text-gray-900 text-center mb-2'>
              Project Details
            </Text>
            <Text className='text-gray-600 text-center'>Detailed view of a coding project.</Text>
          </Card>
        </View>
      </SafeAreaView>
    </>
  )
}
