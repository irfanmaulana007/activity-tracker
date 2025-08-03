import { Link, Stack } from 'expo-router'
import { ScrollView, Text, View } from 'react-native'
import { Button } from '~/components/common'
import { useProjects } from '~/hooks/useProjects'

export default function CodingProjectsScreen() {
  const { projects } = useProjects()
  const codingProjects = projects?.filter((p) => p.type === 'coding')

  return (
    <ScrollView className='flex-1 bg-white'>
      <Stack.Screen
        options={{
          title: 'Coding Projects',
          headerLargeTitle: true,
        }}
      />

      <View className='p-4'>
        <Link href='/projects/coding/new' asChild>
          <Button title='Create New Project' />
        </Link>

        <View className='mt-6'>
          {codingProjects?.map((project) => (
            <Link key={project.id} href={`/projects/coding/${project.id}`} asChild>
              <View className='py-4 border-b border-gray-100'>
                <Text className='text-base font-medium text-gray-900'>{project.name}</Text>
                <Text className='text-sm text-gray-500'>{project.description}</Text>
              </View>
            </Link>
          ))}

          {!codingProjects?.length && (
            <View className='py-12 items-center'>
              <Text className='text-gray-500 text-base'>No coding projects yet</Text>
            </View>
          )}
        </View>
      </View>
    </ScrollView>
  )
}
