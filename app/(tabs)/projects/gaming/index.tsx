import { Link, Stack } from 'expo-router'
import { ScrollView, Text, View } from 'react-native'
import { Button } from '~/components/common'
import { useGames } from '~/hooks/useGames'

export default function GamingLibraryScreen() {
  const { games } = useGames()

  return (
    <ScrollView className='flex-1 bg-white'>
      <Stack.Screen
        options={{
          title: 'Gaming Library',
          headerLargeTitle: true,
        }}
      />

      <View className='p-4'>
        <Link href='/projects/gaming/new' asChild>
          <Button title='Add New Game' />
        </Link>

        <View className='mt-6'>
          {games?.map((game) => (
            <Link key={game.id} href={`/projects/gaming/${game.id}`} asChild>
              <View className='py-4 border-b border-gray-100'>
                <Text className='text-base font-medium text-gray-900'>{game.title}</Text>
                <Text className='text-sm text-gray-500'>{game.platform}</Text>
              </View>
            </Link>
          ))}

          {!games?.length && (
            <View className='py-12 items-center'>
              <Text className='text-gray-500 text-base'>No games in library</Text>
            </View>
          )}
        </View>
      </View>
    </ScrollView>
  )
}
