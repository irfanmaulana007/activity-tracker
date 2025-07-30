// Root Navigation - Handles Auth State

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { View, ActivityIndicator } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import { useAuth } from '../hooks/useAuth';
import AppNavigator from './AppNavigator';
import AuthNavigator from './AuthNavigator';

export const RootNavigator = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator size="large" color="#3b82f6" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <StatusBar style="dark" />
      {user ? <AppNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
};

export default RootNavigator;