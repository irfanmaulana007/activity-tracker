import { Stack, router } from 'expo-router'
import { useState } from 'react'
import { ScrollView, View } from 'react-native'
import { Button, Input } from '~/components/common'
import { useGames } from '~/hooks/useGames'

export default function CreateGameScreen() {
  const { createGame } = useGames()
  const [title, setTitle] = useState('')
  const [platform, setPlatform] = useState('')
  const [errors, setErrors] = useState<{
    title?: string
    platform?: string
  }>({})

  const handleCreate = async () => {
    setErrors({})
    const newErrors: typeof errors = {}

    if (!title) {
      newErrors.title = 'Game title is required'
    }

    if (!platform) {
      newErrors.platform = 'Platform is required'
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    await createGame({
      title,
      platform,
    })

    router.back()
  }

  return (
    <>
      <Stack.Screen
        options={{
          title: 'Add Game',
        }}
      />

      <ScrollView className='flex-1 bg-white px-4'>
        <View className='py-4'>
          <Input
            label='Game Title'
            placeholder='Enter game title'
            value={title}
            onChangeText={setTitle}
            error={errors.title}
          />

          <Input
            label='Platform'
            placeholder='Enter gaming platform'
            value={platform}
            onChangeText={setPlatform}
            error={errors.platform}
          />

          <Button title='Add Game' onPress={handleCreate} className='mt-4' />
        </View>
      </ScrollView>
    </>
  )
}
