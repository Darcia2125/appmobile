import React, { useState, useEffect } from 'react';
import { TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import Login from './src/pages/Login';
import Home from './src/pages/Home';
import Information from './src/pages/Information';
import Course from './src/pages/Course';
import Colis from './src/pages/Colis';
import Message from './src/pages/Messages';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function HomeStack() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarPosition: 'bottom',
        tabBarStyle: { backgroundColor: 'white' },
      }}
    >
      <Tab.Screen name="Home" component={Home} options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" color={color} size={size} />
          ),
        }} />
      <Tab.Screen 
        name="Information" 
        component={Information} 
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="information-circle-outline" color={color} size={size} />
          ),
        }} />
      <Tab.Screen
        name="Course"
        component={Course}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="bicycle" color={color} size={size} />
          ),
        }} 
      />
      <Tab.Screen
        name="Colis"
        component={Colis}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="cube-outline" color={color} size={size} />
          ),
        }}
      />
       <Tab.Screen
        name="Messages"
        component={Message}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="chatbubble" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Logout"
        component={Login}
        listeners={({ navigation }) => ({
          tabPress: (event) => {
            event.preventDefault();
            AsyncStorage.removeItem('token');
            navigation.navigate('Login');
          },
        })}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="log-out" color={color} size={size} />
          ),
        }}
      />
      
    </Tab.Navigator>
  );
}

function MainTabScreen() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeStack}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" color={color} size={size} />
          ),
          headerShown: false
        }}
      />
      <Stack.Screen name="Information" component={Information} options={{ headerShown: false }}/>
      <Stack.Screen name="Course" component={Course} options={{ headerShown: false }}/>
      <Stack.Screen name="Colis" component={Colis} options={{ headerShown: false }}/>
      <Stack.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false }}
          />
    </Stack.Navigator>
  );
}

export default function App() {
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    const checkLogin = async () => {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        setIsLogged(true);
      }
    };

    checkLogin();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isLogged ? (
          <Stack.Screen
            name="MainTabScreen"
            component={MainTabScreen}
            options={{ headerShown: false }}
          />
        ) : (
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false }}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}