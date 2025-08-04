import { Text, View } from 'react-native'
import { Card } from '~/components/common'

interface ActivityCardProps {
  title: string
  color: string
  icon: React.ReactNode
  onPress: () => void
}

export default function ActivityCard({ title, color, icon, onPress }: ActivityCardProps) {
  return (
    <Card onPress={onPress} variant='elevated' className='flex-1 mx-1'>
      <View className='items-center py-4'>
        {icon}
        <Text className='text-gray-900 font-semibold mt-2 text-center'>{title}</Text>
      </View>
    </Card>
  )
}
