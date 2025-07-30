// Main App Navigation

import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';

// Import screens (will be created later)
import HomeScreen from '../screens/home/HomeScreen';
import NewActivityScreen from '../screens/activities/NewActivityScreen';
import ProjectsScreen from '../screens/projects/ProjectsScreen';
import HistoryScreen from '../screens/activities/HistoryScreen';
import ProfileScreen from '../screens/profile/ProfileScreen';

// Activity screens
import StartCodingScreen from '../screens/activities/StartCodingScreen';
import StartGamingScreen from '../screens/activities/StartGamingScreen';
import StartRunningScreen from '../screens/activities/StartRunningScreen';

// Project management screens
import CodingProjectsScreen from '../screens/projects/CodingProjectsScreen';
import GamingLibraryScreen from '../screens/projects/GamingLibraryScreen';
import ProjectDetailScreen from '../screens/projects/ProjectDetailScreen';
import GameDetailScreen from '../screens/projects/GameDetailScreen';
import CreateProjectScreen from '../screens/projects/CreateProjectScreen';
import CreateGameScreen from '../screens/projects/CreateGameScreen';
import EditProjectScreen from '../screens/projects/EditProjectScreen';
import EditGameScreen from '../screens/projects/EditGameScreen';

// Activity detail screens
import ActivityDetailScreen from '../screens/activities/ActivityDetailScreen';

import { RootStackParamList } from '../types';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator<RootStackParamList>();

// New Activity Stack Navigator
const NewActivityStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="NewActivity" component={NewActivityScreen} />
    <Stack.Screen name="StartCoding" component={StartCodingScreen} />
    <Stack.Screen name="StartGaming" component={StartGamingScreen} />
    <Stack.Screen name="StartRunning" component={StartRunningScreen} />
  </Stack.Navigator>
);

// Projects Stack Navigator
const ProjectsStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Projects" component={ProjectsScreen} />
    <Stack.Screen name="CodingProjects" component={CodingProjectsScreen} />
    <Stack.Screen name="GamingLibrary" component={GamingLibraryScreen} />
    <Stack.Screen name="ProjectDetail" component={ProjectDetailScreen} />
    <Stack.Screen name="GameDetail" component={GameDetailScreen} />
    <Stack.Screen name="CreateProject" component={CreateProjectScreen} />
    <Stack.Screen name="CreateGame" component={CreateGameScreen} />
    <Stack.Screen name="EditProject" component={EditProjectScreen} />
    <Stack.Screen name="EditGame" component={EditGameScreen} />
  </Stack.Navigator>
);

// History Stack Navigator
const HistoryStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="History" component={HistoryScreen} />
    <Stack.Screen name="ActivityDetail" component={ActivityDetailScreen} />
  </Stack.Navigator>
);

// Main Tab Navigator
const TabNavigator = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName: keyof typeof Ionicons.glyphMap;

        if (route.name === 'HomeTab') {
          iconName = focused ? 'home' : 'home-outline';
        } else if (route.name === 'NewActivityTab') {
          iconName = focused ? 'add-circle' : 'add-circle-outline';
        } else if (route.name === 'ProjectsTab') {
          iconName = focused ? 'folder' : 'folder-outline';
        } else if (route.name === 'HistoryTab') {
          iconName = focused ? 'time' : 'time-outline';
        } else if (route.name === 'ProfileTab') {
          iconName = focused ? 'person' : 'person-outline';
        } else {
          iconName = 'help-outline';
        }

        return <Ionicons name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: '#3b82f6',
      tabBarInactiveTintColor: 'gray',
      tabBarStyle: {
        backgroundColor: 'white',
        borderTopColor: '#e5e7eb',
        height: 90,
        paddingBottom: 20,
        paddingTop: 10,
      },
      headerShown: false,
    })}
  >
    <Tab.Screen
      name="HomeTab"
      component={HomeScreen}
      options={{ tabBarLabel: 'Home' }}
    />
    <Tab.Screen
      name="NewActivityTab"
      component={NewActivityStack}
      options={{ tabBarLabel: 'New Activity' }}
    />
    <Tab.Screen
      name="ProjectsTab"
      component={ProjectsStack}
      options={{ tabBarLabel: 'Projects' }}
    />
    <Tab.Screen
      name="HistoryTab"
      component={HistoryStack}
      options={{ tabBarLabel: 'History' }}
    />
    <Tab.Screen
      name="ProfileTab"
      component={ProfileScreen}
      options={{ tabBarLabel: 'Profile' }}
    />
  </Tab.Navigator>
);

// Main App Navigator
export const AppNavigator = () => (
  <TabNavigator />
);

export default AppNavigator;