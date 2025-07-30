import React from 'react';
import { View, Text, SafeAreaView } from 'react-native';
import { Card } from '../../components/common';

const CreateProjectScreen: React.FC = () => {
  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <View className="flex-1 justify-center items-center px-6">
        <Card className="w-full">
          <Text className="text-xl font-semibold text-gray-900 text-center mb-2">
            Create Project
          </Text>
          <Text className="text-gray-600 text-center">
            Create a new coding project.
          </Text>
        </Card>
      </View>
    </SafeAreaView>
  );
};

export default CreateProjectScreen;