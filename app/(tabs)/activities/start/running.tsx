import { Stack, router } from 'expo-router'
import { useState } from 'react'
import { ScrollView, View } from 'react-native'
import { Button, Input } from '~/components/common'
import { useActivities } from '~/hooks/useActivities'

export default function StartRunningScreen() {
  const { createActivity } = useActivities()
  const [duration, setDuration] = useState('')
  const [errors, setErrors] = useState<{
    duration?: string
  }>({})

  const handleStart = async () => {
    setErrors({})
    const newErrors: typeof errors = {}

    if (!duration || isNaN(Number(duration))) {
      newErrors.duration = 'Please enter a valid duration'
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    await createActivity({
      category: 'running',
      startTime: new Date(),
      endTime: new Date(),
      duration: Number(duration),
    })

    router.back()
  }

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          title: 'Start Running',
        }}
      />

      <ScrollView className='flex-1 bg-white px-4'>
        <View className='py-4'>
          <Input
            label='Duration (minutes)'
            placeholder='Enter duration in minutes'
            value={duration}
            onChangeText={setDuration}
            keyboardType='numeric'
            error={errors.duration}
          />

          <Button title='Start Running' onPress={handleStart} className='mt-4' />
        </View>
      </ScrollView>
    </>
  )
}
