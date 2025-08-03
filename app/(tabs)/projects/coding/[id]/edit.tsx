import { Stack, router, useLocalSearchParams } from 'expo-router'
import { useEffect, useState } from 'react'
import { ScrollView, View } from 'react-native'
import { Button, Input } from '~/components/common'
import { useProjects } from '~/hooks/useProjects'

export default function EditProjectScreen() {
  const { id } = useLocalSearchParams()
  const { getProject, updateProject } = useProjects()
  const project = getProject(id as string)

  const [name, setName] = useState(project?.name || '')
  const [description, setDescription] = useState(project?.description || '')
  const [errors, setErrors] = useState<{
    name?: string
  }>({})

  useEffect(() => {
    if (!project) {
      router.back()
    }
  }, [project])

  const handleUpdate = async () => {
    setErrors({})
    const newErrors: typeof errors = {}

    if (!name) {
      newErrors.name = 'Project name is required'
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    await updateProject(id as string, {
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
          title: 'Edit Project',
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

          <Button title='Update Project' onPress={handleUpdate} className='mt-4' />
        </View>
      </ScrollView>
    </>
  )
}
