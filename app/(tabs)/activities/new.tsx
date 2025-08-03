import { Stack, router } from 'expo-router'
import { useState } from 'react'
import { ScrollView, View } from 'react-native'
import { Button, Input } from '~/components/common'
import { useActivities } from '~/hooks/useActivities'

export default function NewActivityScreen() {
  const { createActivity } = useActivities()
  const [name, setName] = useState('')
  const [duration, setDuration] = useState('')
  const [description, setDescription] = useState('')
  const [errors, setErrors] = useState<{
    name?: string
    duration?: string
  }>({})

  const handleCreate = async () => {
    setErrors({})
    const newErrors: typeof errors = {}

    if (!name) {
      newErrors.name = 'Activity name is required'
    }

    if (!duration || isNaN(Number(duration))) {
      newErrors.duration = 'Please enter a valid duration'
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    await createActivity({
      category: 'coding',
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
          title: 'New Activity',
        }}
      />

      <ScrollView className='flex-1 bg-white px-4'>
        <View className='py-4'>
          <Input
            label='Activity Name'
            placeholder='Enter activity name'
            value={name}
            onChangeText={setName}
            error={errors.name}
          />

          <Input
            label='Duration (minutes)'
            placeholder='Enter duration in minutes'
            value={duration}
            onChangeText={setDuration}
            keyboardType='numeric'
            error={errors.duration}
          />

          <Input
            label='Description (optional)'
            placeholder='Enter activity description'
            value={description}
            onChangeText={setDescription}
            multiline
            numberOfLines={4}
            className='h-24'
          />

          <Button title='Create Activity' onPress={handleCreate} className='mt-4' />
        </View>
      </ScrollView>
    </>
  )
}
