import { SafeAreaView, Text, TouchableOpacity, View } from 'react-native'
import { useTrack } from '~/hooks/useTrack'

export default function Track() {
  const { isTracking } = useTrack()

  return (
    <SafeAreaView className='flex-1 bg-white'>
      <View className='flex-1 items-center justify-center gap-4'>
        {isTracking ? <StopButton /> : <StartButton />}
      </View>
    </SafeAreaView>
  )
}

const StartButton = () => {
  const { startTracking } = useTrack()

  return (
    <>
      <TouchableOpacity
        className='bg-red-500 rounded-full p-2'
        activeOpacity={0.7}
        onPress={() => startTracking('coding')}>
        <View className='bg-white rounded-full items-center justify-center p-2'>
          <View className='w-14 h-14 bg-red-500 rounded-full' />
        </View>
      </TouchableOpacity>
      <Text className='font-medium'>Start Tracking</Text>
    </>
  )
}

const StopButton = () => {
  const { stopTracking } = useTrack()

  return (
    <>
      <TouchableOpacity
        className='bg-red-500 rounded-sm p-2'
        activeOpacity={0.7}
        onPress={() => stopTracking()}>
        <View className='bg-white rounded-sm items-center justify-center p-2'>
          <View className='w-14 h-14 bg-red-500 rounded-sm' />
        </View>
      </TouchableOpacity>
      <Text className='font-medium'>Stop Tracking</Text>
    </>
  )
}
