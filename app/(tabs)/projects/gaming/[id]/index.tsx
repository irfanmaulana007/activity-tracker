import { Link, Stack, router, useLocalSearchParams } from 'expo-router'
import { ScrollView, Text, View } from 'react-native'
import { Button } from '~/components/common'
import { useGames } from '~/hooks/useGames'

export default function GameDetailScreen() {
  const { id } = useLocalSearchParams()
  const { getGame, deleteGame } = useGames()
  const game = getGame(id as string)

  const handleDelete = async () => {
    await deleteGame(id as string)
    router.back()
  }

  if (!game) {
    return (
      <>
        <Stack.Screen
          options={{
            title: 'Not Found',
          }}
        />
        <View className='flex-1 justify-center items-center bg-white'>
          <Text className='text-gray-500 text-base'>Game not found</Text>
        </View>
      </>
    )
  }

  return (
    <>
      <Stack.Screen
        options={{
          title: game.title,
        }}
      />

      <ScrollView className='flex-1 bg-white px-4'>
        <View className='py-4'>
          <Text className='text-xl font-semibold text-gray-900 mb-2'>{game.title}</Text>
          <Text className='text-base text-gray-500 mb-4'>{game.platform}</Text>

          <View className='flex-row gap-4'>
            <Link href={`/projects/gaming/${id}/edit`} asChild>
              <Button title='Edit Game' className='flex-1' />
            </Link>
            <Button
              title='Delete Game'
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
