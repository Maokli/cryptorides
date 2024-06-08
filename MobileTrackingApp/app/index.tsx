import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/Login'; // Make sure this matches your file name
import CarListScreen from '../screens/CarListScreen';
import CarMapScreen from '../screens/MapView';

type RootStackParamList = {
  Home: undefined;
  Login: undefined;
  Cars: undefined;
  CarMap: { id: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const MyStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ 
            title: 'Welcome',
            headerStyle: {
              backgroundColor: '#000000',
            },
            headerTitleStyle: {
              color: '#ffffff', // Ensures text color is visible on dark background
            },
          }}
        />
        <Stack.Screen 
          name="Login" 
          component={LoginScreen}
          options={{
            title: 'Login',
            headerStyle: {
              backgroundColor: '#000000',
            },
            headerTitleStyle: {
              color: '#ffffff', // Ensures text color is visible on dark background
            },
          }} 
        />
        <Stack.Screen 
          name="Cars" 
          component={CarListScreen} 
          options={{ 
            title: 'My Cars',
            headerStyle: {
              backgroundColor: '#E6BABA',
            },
            headerTitleStyle: {
              fontFamily: 'Montserrat-Regular',
            },
          }} 
        />
        <Stack.Screen 
          name="CarMap" 
          component={CarMapScreen} 
          options={{
            title: 'Car Map',
            headerStyle: {
              backgroundColor: '#E6BABA',
            },
            headerTitleStyle: {
              fontFamily: 'Montserrat-Regular',
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MyStack;
