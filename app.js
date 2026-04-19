import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Image } from 'react-native';

import Dashboard from './screens/Dashboard';
import CropLibrary from './screens/CropLibrary';
import ScanScreen from './screens/ScanScreen';
import HistoryScreen from './screens/HistoryScreen';
import ProfileScreen from './screens/ProfileScreen';
import ResultScreen from './screens/ResultScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused }) => {
          let iconName;
          if (route.name === 'Home') iconName = require('./assets/nav_home.png');
          else if (route.name === 'Library') iconName = require('./assets/nav_leaf.png');
          else if (route.name === 'Scan') iconName = require('./assets/nav_scan.png');
          else if (route.name === 'History') iconName = require('./assets/nav_clock.png');
          else if (route.name === 'Profile') iconName = require('./assets/nav_profile.png');
          
          return <Image source={iconName} style={{ width: 24, height: 24, tintColor: focused ? '#4A7055' : '#888' }} />;
        },
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: '#ffffff',
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          height: 70,
          position: 'absolute',
        }
      })}
    >
      <Tab.Screen name="Home" component={Dashboard} />
      <Tab.Screen name="Library" component={CropLibrary} />
      <Tab.Screen name="Scan" component={ScanScreen} />
      <Tab.Screen name="History" component={HistoryScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="MainTabs" component={MainTabs} />
        <Stack.Screen name="Result" component={ResultScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}