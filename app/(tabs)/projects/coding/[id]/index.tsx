import { Link, Stack, router, useLocalSearchParams } from 'expo-router'
import { ScrollView, Text, View } from 'react-native'
import { Button } from '~/components/common'
import { useProjects } from '~/hooks/useProjects'

export default function ProjectDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>()
  const { projects, deleteProject } = useProjects()
  const project = projects.find((project) => project.projectId === id)

  const handleDelete = async () => {
    await deleteProject(id as string)
    router.back()
  }

  if (!project) {
    return (
      <>
        <Stack.Screen
          options={{
            title: 'Not Found',
          }}
        />
        <View className='flex-1 justify-center items-center bg-white'>
          <Text className='text-gray-500 text-base'>Project not found</Text>
        </View>
      </>
    )
  }

  return (
    <>
      <Stack.Screen
        options={{
          title: project.name,
        }}
      />

      <ScrollView className='flex-1 bg-white px-4'>
        <View className='py-4'>
          <Text className='text-xl font-semibold text-gray-900 mb-2'>{project.name}</Text>
          <Text className='text-base text-gray-500 mb-4'>{project.description}</Text>

          <View className='flex-row gap-4'>
            <Link href={`/projects/coding/${id}/edit`} asChild>
              <Button title='Edit Project' className='flex-1' />
            </Link>
            <Button
              title='Delete Project'
              variant='danger'
              onPress={handleDelete}
              className='flex-1'
            />
          </View>
        </View>
      </ScrollView>
    </>
  )
}
