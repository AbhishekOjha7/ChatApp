import {View, Text, AppState} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import SplashScreen from '../screens/onboardingScreen/splashScreen';
import SignIn from '../screens/onboardingScreen/sign';
import ProfileScreen from '../screens/profileScreen/profile';
import OtpScreen from '../screens/onboardingScreen/otpScreen';
import MessageScreen from '../screens/chat/messageScreen';
import HomeScreen from '../screens/homeScreens';
import Chating from '../screens/chat/messageScreen/chating';
import {useSelector} from 'react-redux';
import firestore from '@react-native-firebase/firestore';
import AllContact from '../screens/chat/messageScreen/allContact';
const Stack = createNativeStackNavigator();

const NavigationScreen = () => {
  const appState = useRef(AppState.currentState);
  const {Auth_Data} = useSelector((store: any) => store.authReducer);
  let UserId = Auth_Data?.user?.user?.uid;
  // console.log('AUTHHHHHH', Auth_Data);
  const [userStatus, setUserStatus] = useState('');

  useEffect(() => {
    firestore().collection('Users').doc(UserId).update({
      isActive: 'online',
    });

    const subscription = AppState.addEventListener('change', nextAppState => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        firestore().collection('Users').doc(UserId).update({
          isActive: 'online',
        });

        // status = true;
      } else {
        firestore().collection('Users').doc(UserId).update({
          isActive: 'offline',
        });
      }
      appState.current = nextAppState;
      setUserStatus(appState.current);
      console.log('AppState', appState.current);
    });

    return () => {
      subscription.remove();
    };
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Splash" component={SplashScreen} />
        {/* <Stack.Screen name="SignUp" component={SignUp}/> */}
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="OtpScreen" component={OtpScreen} />
        <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="MessageScreen" component={MessageScreen} />
        <Stack.Screen name="Chating" component={Chating} />
        <Stack.Screen name="AllContact" component={AllContact} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default NavigationScreen;
