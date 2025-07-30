// Profile Screen - Placeholder

import React from 'react';
import { View, Text, SafeAreaView } from 'react-native';
import { Card, Button } from '../../components/common';
import { useAuth } from '../../hooks/useAuth';

export const ProfileScreen: React.FC = () => {
  const { user, signOut } = useAuth();

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <View className="flex-1 px-6 pt-6">
        <Text className="text-2xl font-bold text-gray-900 mb-6">
          Profile
        </Text>
        
        <Card className="mb-4">
          <Text className="text-lg font-semibold text-gray-900 mb-2">
            User Information
          </Text>
          <Text className="text-gray-600">
            Email: {user?.email || 'Not available'}
          </Text>
        </Card>

        <Card className="mb-4">
          <Text className="text-gray-600 text-center">
            Profile settings and preferences will be available here.
          </Text>
        </Card>

        <Button
          title="Sign Out"
          variant="danger"
          onPress={handleSignOut}
        />
      </View>
    </SafeAreaView>
  );
};

export default ProfileScreen;