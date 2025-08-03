import { Ionicons } from '@expo/vector-icons'
import { Text, View } from 'react-native'
import { Card } from '~/components/common'

interface ActivityCardProps {
  title: string
  icon: keyof typeof Ionicons.glyphMap
  color: string
  onPress: () => void
}

export default function ActivityCard({ title, icon, color, onPress }: ActivityCardProps) {
  return (
    <Card onPress={onPress} variant='elevated' className='flex-1 mx-1'>
      <View className='items-center py-4'>
        <Ionicons name={icon} size={32} color={color} />
        <Text className='text-gray-900 font-semibold mt-2 text-center'>{title}</Text>
      </View>
    </Card>
  )
}
