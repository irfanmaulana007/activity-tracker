import { Ionicons } from '@expo/vector-icons'
import { Text, View } from 'react-native'
import { Card } from '~/components/common'
import { formatDurationCompact } from '~/utils/format'

interface QuickStartItemProps {
  item: {
    name: string
    category: string
    totalDuration: number
  }
}

export default function QuickStartItem({ item }: QuickStartItemProps) {
  return (
    <Card
      onPress={() => {
        /* TODO: Start timer with this item */
      }}
      className='mb-2'>
      <View className='flex-row items-center justify-between'>
        <View className='flex-1'>
          <Text className='text-gray-900 font-medium text-base'>{item.name}</Text>
          <Text className='text-gray-500 text-sm capitalize'>
            {item.category} • {formatDurationCompact(item.totalDuration)} total
          </Text>
        </View>
        <Ionicons name='play-circle' size={24} color='#3b82f6' />
      </View>
    </Card>
  )
}
