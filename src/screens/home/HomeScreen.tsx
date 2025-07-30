// Home Screen

import React from 'react';
import { View, Text, SafeAreaView, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Card, Button } from '../../components/common';
import { useQuickStart } from '../../hooks/useQuickStart';
import { useTimer } from '../../hooks/useTimer';
import { formatDurationCompact } from '../../utils/format';

export const HomeScreen: React.FC = () => {
  const { quickStartItems, loading } = useQuickStart();
  const { timerState } = useTimer();

  const ActivityCard = ({ 
    title, 
    icon, 
    color, 
    onPress 
  }: { 
    title: string; 
    icon: keyof typeof Ionicons.glyphMap; 
    color: string;
    onPress: () => void;
  }) => (
    <Card onPress={onPress} variant="elevated" className="flex-1 mx-1">
      <View className="items-center py-4">
        <Ionicons name={icon} size={32} color={color} />
        <Text className="text-gray-900 font-semibold mt-2 text-center">
          {title}
        </Text>
      </View>
    </Card>
  );

  const QuickStartItem = ({ item }: { item: any }) => (
    <Card onPress={() => {/* TODO: Start timer with this item */}} className="mb-2">
      <View className="flex-row items-center justify-between">
        <View className="flex-1">
          <Text className="text-gray-900 font-medium text-base">
            {item.name}
          </Text>
          <Text className="text-gray-500 text-sm capitalize">
            {item.category} • {formatDurationCompact(item.totalDuration)} total
          </Text>
        </View>
        <Ionicons name="play-circle" size={24} color="#3b82f6" />
      </View>
    </Card>
  );

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView className="flex-1">
        {/* Header */}
        <View className="px-6 pt-6 pb-4">
          <Text className="text-2xl font-bold text-gray-900">
            ActivityTracker Pro
          </Text>
          <Text className="text-gray-600 mt-1">
            Track your productivity activities
          </Text>
        </View>

        {/* Active Timer */}
        {timerState.isActive && (
          <View className="px-6 mb-6">
            <Card variant="elevated" className="bg-primary-50 border border-primary-200">
              <View className="flex-row items-center justify-between">
                <View>
                  <Text className="text-primary-700 font-semibold text-lg">
                    Timer Active
                  </Text>
                  <Text className="text-primary-600 capitalize">
                    {timerState.category} • {formatDurationCompact(timerState.elapsedTime)}
                  </Text>
                </View>
                <View className="flex-row">
                  <Button
                    title="Pause"
                    size="small"
                    variant="outline"
                    onPress={() => {/* TODO: Pause timer */}}
                    className="mr-2"
                  />
                  <Button
                    title="Stop"
                    size="small"
                    variant="danger"
                    onPress={() => {/* TODO: Stop timer */}}
                  />
                </View>
              </View>
            </Card>
          </View>
        )}

        {/* Activity Categories */}
        <View className="px-6 mb-6">
          <Text className="text-xl font-semibold text-gray-900 mb-4">
            Start New Activity
          </Text>
          <View className="flex-row">
            <ActivityCard
              title="Coding"
              icon="code-slash"
              color="#3b82f6"
              onPress={() => {/* TODO: Navigate to start coding */}}
            />
            <ActivityCard
              title="Gaming"
              icon="game-controller"
              color="#10b981"
              onPress={() => {/* TODO: Navigate to start gaming */}}
            />
            <ActivityCard
              title="Running"
              icon="footsteps"
              color="#f59e0b"
              onPress={() => {/* TODO: Navigate to start running */}}
            />
          </View>
        </View>

        {/* Quick Start */}
        {quickStartItems.length > 0 && (
          <View className="px-6 mb-6">
            <Text className="text-xl font-semibold text-gray-900 mb-4">
              Quick Start
            </Text>
            {quickStartItems.slice(0, 5).map((item) => (
              <QuickStartItem key={item.id} item={item} />
            ))}
          </View>
        )}

        {/* Recent Activities */}
        <View className="px-6 mb-6">
          <View className="flex-row items-center justify-between mb-4">
            <Text className="text-xl font-semibold text-gray-900">
              Recent Activities
            </Text>
            <Button
              title="View All"
              variant="outline"
              size="small"
              onPress={() => {/* TODO: Navigate to history */}}
            />
          </View>
          
          <Card>
            <Text className="text-gray-500 text-center py-8">
              No recent activities
            </Text>
          </Card>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;