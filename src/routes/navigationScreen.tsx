import {View, Text, AppState} from 'react-native';
import React, {useEffect, useRef} from 'react';
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
const Stack = createNativeStackNavigator();

const NavigationScreen = () => {
  const appState = useRef(AppState.currentState);
  const {Auth_Data} = useSelector((store: any) => store.authReducer);
  let UserId = Auth_Data?.user?.user?.uid;
  console.log('AUTHHHHHH', Auth_Data);

  useEffect(() => {
    AppState.addEventListener('change', _handleAppStateChange);

    return () => {
      AppState.removeEventListener('change', _handleAppStateChange);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const _handleAppStateChange = (nextAppState: any) => {
    console.log('AppState', appState.current);
    if (
      appState.current.match(/inactive|background/) &&
      nextAppState === 'active'
    ) {
      // TODO SET USERS ONLINE STATUS TO TRUE
      firestore().collection('Users').doc(UserId).update({
        isActive: true,
      });
    } else {
      // TODO SET USERS ONLINE STATUS
      firestore().collection('Users').doc(UserId).update({
        isActive: false,
      });
    }

    appState.current = nextAppState;
  };

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
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default NavigationScreen;
