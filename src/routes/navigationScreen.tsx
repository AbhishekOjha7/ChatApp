import {View, Text} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import SplashScreen from '../screens/onboardingScreen/splashScreen';
import SignIn from '../screens/onboardingScreen/sign';
import ProfileScreen from '../screens/profileScreen/profile';
import OtpScreen from '../screens/onboardingScreen/otpScreen';
import HomeScreen from '../screens/homeScreens';
import HomeChatScreen from '../screens/chat/homeChat';
import MessageScreen from '../screens/chat/messageScreen';
import PersonalChat from '../screens/chat/homeChat/personalChat';

const Stack = createNativeStackNavigator();

const NavigationScreen = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Splash" component={SplashScreen} />
        {/* <Stack.Screen name="SignUp" component={SignUp}/> */}
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="OtpScreen" component={OtpScreen} />
        <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="HomeChatScreen" component={HomeChatScreen} />
        <Stack.Screen name="MessageScreen" component={MessageScreen} />
        <Stack.Screen name="PersonalChat" component={PersonalChat} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default NavigationScreen;
