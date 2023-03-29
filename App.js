import React, { useEffect, useContext } from "react";
import { TouchableOpacity } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import {
  CompteContextProvider,
  CompteContext,
} from "./src/utils/contexte/CompteContext";

import Login from "./src/pages/Login";
import Home from "./src/pages/Home";
import Information from "./src/pages/Information";
import Course from "./src/pages/Course";
import Colis from "./src/pages/Colis";
import Message from "./src/pages/Messages";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function HomeStack() {
  const { isLogged, setIsLogged } = useContext(CompteContext);
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarPosition: "bottom",
        tabBarStyle: { backgroundColor: "white" },
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Information"
        component={Information}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="information-circle-outline"
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Course"
        component={Course}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="bicycle" color={color} size={size} />
          ),
        }}
      />
      {/* <Tab.Screen
        name="Colis"
        component={Colis}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="cube-outline" color={color} size={size} />
          ),
        }}
      /> */}
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
            AsyncStorage.removeItem("token");
            setIsLogged(false);
            setTimeout(() => {
              navigation.navigate("Login");
            }, 500);
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
  const { isLogged, setIsLogged } = useContext(CompteContext);

  useEffect(() => {
    const checkLogin = async () => {
      const token = await AsyncStorage.getItem("token");
      if (token) {
        setIsLogged(true);
      }
    };
    checkLogin();
  }, []);

  return isLogged ? (
    <Stack.Navigator initialRouteName="Accueil">
      <Stack.Screen
        name="Accueil"
        component={HomeStack}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" color={color} size={size} />
          ),
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Information"
        component={Information}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Course"
        component={Course}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Colis"
        component={Colis}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  ) : (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

/*APP component ===> principale*/
export default function App() {
  return (
    <CompteContextProvider>
      <SafeAreaProvider>
        <NavigationContainer>
          <MainTabScreen />
        </NavigationContainer>
      </SafeAreaProvider>
    </CompteContextProvider>
  );
}
