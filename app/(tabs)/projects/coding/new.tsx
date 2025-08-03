import { Stack, router } from 'expo-router'
import { useState } from 'react'
import { ScrollView, View } from 'react-native'
import { Button, Input } from '~/components/common'
import { useProjects } from '~/hooks/useProjects'

export default function CreateProjectScreen() {
  const { createProject } = useProjects()
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [errors, setErrors] = useState<{
    name?: string
  }>({})

  const handleCreate = async () => {
    setErrors({})
    const newErrors: typeof errors = {}

    if (!name) {
      newErrors.name = 'Project name is required'
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    await createProject({
      name,
      description,
      type: 'coding',
    })

    router.back()
  }

  return (
    <>
      <Stack.Screen
        options={{
          title: 'Create Project',
        }}
      />

      <ScrollView className='flex-1 bg-white px-4'>
        <View className='py-4'>
          <Input
            label='Project Name'
            placeholder='Enter project name'
            value={name}
            onChangeText={setName}
            error={errors.name}
          />

          <Input
            label='Description (optional)'
            placeholder='Enter project description'
            value={description}
            onChangeText={setDescription}
            multiline
            numberOfLines={4}
            className='h-24'
          />

          <Button title='Create Project' onPress={handleCreate} className='mt-4' />
        </View>
      </ScrollView>
    </>
  )
}
