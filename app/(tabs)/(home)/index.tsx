import { Stack } from 'expo-router'
import { ScrollView, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Button, Card } from '~/components/common'
import ActivityCard from '~/components/module/home/ActivityCard'
import QuickStartItem from '~/components/module/home/QuickStartItem'
import { useQuickStart } from '~/hooks/useQuickStart'
import { useTimer } from '~/hooks/useTimer'
import { formatDurationCompact } from '~/utils/format'

export default function Home() {
  const { quickStartItems } = useQuickStart()
  const { timerState } = useTimer()

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />

      <SafeAreaView className='flex-1 bg-gray-50'>
        <ScrollView className='flex-1'>
          {/* Header */}
          <View className='px-6 pt-6 pb-4'>
            <Text className='text-2xl font-bold text-gray-900'>ActivityTracker Pro</Text>
            <Text className='text-gray-600 mt-1'>Track your productivity activities</Text>
          </View>

          {/* Active Timer */}
          {timerState.isActive && (
            <View className='px-6 mb-6'>
              <Card variant='elevated' className='bg-primary-50 border border-primary-200'>
                <View className='flex-row items-center justify-between'>
                  <View>
                    <Text className='text-primary-700 font-semibold text-lg'>Timer Active</Text>
                    <Text className='text-primary-600 capitalize'>
                      {timerState.category} • {formatDurationCompact(timerState.elapsedTime)}
                    </Text>
                  </View>
                  <View className='flex-row'>
                    <Button
                      title='Pause'
                      size='small'
                      variant='outline'
                      onPress={() => {
                        /* TODO: Pause timer */
                      }}
                      className='mr-2'
                    />
                    <Button
                      title='Stop'
                      size='small'
                      variant='danger'
                      onPress={() => {
                        /* TODO: Stop timer */
                      }}
                    />
                  </View>
                </View>
              </Card>
            </View>
          )}

          {/* Activity Categories */}
          <View className='px-6 mb-6'>
            <Text className='text-xl font-semibold text-gray-900 mb-4'>Start New Activity</Text>
            <View className='flex-row'>
              <ActivityCard
                title='Coding'
                icon='code-slash'
                color='#3b82f6'
                onPress={() => {
                  /* TODO: Navigate to start coding */
                }}
              />
              <ActivityCard
                title='Gaming'
                icon='game-controller'
                color='#10b981'
                onPress={() => {
                  /* TODO: Navigate to start gaming */
                }}
              />
              <ActivityCard
                title='Running'
                icon='footsteps'
                color='#f59e0b'
                onPress={() => {
                  /* TODO: Navigate to start running */
                }}
              />
            </View>
          </View>

          {/* Quick Start */}
          {quickStartItems.length > 0 && (
            <View className='px-6 mb-6'>
              <Text className='text-xl font-semibold text-gray-900 mb-4'>Quick Start</Text>
              {quickStartItems.slice(0, 5).map((item) => (
                <QuickStartItem key={item.id} item={item} />
              ))}
            </View>
          )}

          {/* Recent Activities */}
          <View className='px-6 mb-6'>
            <View className='flex-row items-center justify-between mb-4'>
              <Text className='text-xl font-semibold text-gray-900'>Recent Activities</Text>
              <Button
                title='View All'
                variant='outline'
                size='small'
                onPress={() => {
                  /* TODO: Navigate to history */
                }}
              />
            </View>

            <Card>
              <Text className='text-gray-500 text-center py-8'>No recent activities</Text>
            </Card>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  )
}
