import React from 'react';
import { View, Text, SafeAreaView } from 'react-native';
import { Card } from '../../components/common';

const ProjectDetailScreen: React.FC = () => {
  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <View className="flex-1 justify-center items-center px-6">
        <Card className="w-full">
          <Text className="text-xl font-semibold text-gray-900 text-center mb-2">
            Project Details
          </Text>
          <Text className="text-gray-600 text-center">
            Detailed view of a coding project.
          </Text>
        </Card>
      </View>
    </SafeAreaView>
  );
};

export default ProjectDetailScreen;