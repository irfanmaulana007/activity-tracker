import { Stack, router, useLocalSearchParams } from 'expo-router'
import { useEffect, useState } from 'react'
import { ScrollView, View } from 'react-native'
import { Button, Input } from '~/components/common'
import { useGames } from '~/hooks/useGames'

export default function EditGameScreen() {
  const { id } = useLocalSearchParams()
  const { getGame, updateGame } = useGames()
  const game = getGame(id as string)

  const [title, setTitle] = useState(game?.title || '')
  const [platform, setPlatform] = useState(game?.platform || '')
  const [errors, setErrors] = useState<{
    title?: string
    platform?: string
  }>({})

  useEffect(() => {
    if (!game) {
      router.back()
    }
  }, [game])

  const handleUpdate = async () => {
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

    await updateGame(id as string, {
      title,
      platform,
    })

    router.back()
  }

  return (
    <>
      <Stack.Screen
        options={{
          title: 'Edit Game',
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

          <Button title='Update Game' onPress={handleUpdate} className='mt-4' />
        </View>
      </ScrollView>
    </>
  )
}
