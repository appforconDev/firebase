import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import firebaseConfig from './utils/firebase';
import LoginScreen from './components/Authentication/LoginScreen';
import SignUpScreen from './components/Authentication/SignUpScreen';
import EditProfileScreen from './components/Profile/EditProfileScreen';
import ChatScreen from './components/Chat/ChatScreen';
import AccountSettings from './components/Settings/AccountSettings';
import FeedScreen from './components/Feed/FeedScreen';
import ExploreScreen from './components/Explore/ExploreScreen';


firebase.initializeApp(firebaseConfig);
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
    </Stack.Navigator>
  );
};

const MainTabs = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen 
        name="Xplore" 
        component={ExploreScreen} 
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="search" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen 
        name="Edit" 
        component={EditProfileScreen} 
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="create" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen 
        name="Chat" 
        component={ChatScreen} 
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="chatbubble" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen 
        name="Feed" 
        component={FeedScreen} 
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="newspaper" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen 
        name="Settings" 
        component={AccountSettings} 
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="settings" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const App = () => {
  useEffect(() => {
    // Additional initialization logic can go here if needed
  }, []);

  return (
    <NavigationContainer>
       <Stack.Navigator headerMode="none" initialRouteName="AuthStack"> 
        <Stack.Screen name="AuthStack" component={AuthStack} />
        <Stack.Screen name="MainTabs" component={MainTabs} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
