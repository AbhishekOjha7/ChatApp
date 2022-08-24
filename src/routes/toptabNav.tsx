// import {View, Text,} from 'react-native';
// import React from 'react';
// import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
// const TopTab = createMaterialTopTabNavigator();
// import MessageScreen from '../screens/chat/messageScreen';
// import { COLOR } from '../utils/color';
// import StatusScreen from '../screens/chat/statusScreen';
// import CallScreen from '../screens/chat/callScreen';

// export default function TopTabNav() {
//     console.log("toppppppp");

//   return (

//     <TopTab.Navigator
//       sceneContainerStyle={{backgroundColor: 'transparent'}}
//       screenOptions={({route}) => ({
//         tabBarStyle: {backgroundColor: 'transparent'},
//         tabBarLabel: ({focused}) => {
//           return (
//             <Text
//               style={
//                 focused
//                   ? {fontSize: 16,  color: COLOR.green}
//                   : {fontSize: 16,  color: 'grey'}
//               }>
//               {route.name}
//             </Text>
//           );
//         },
//         tabBarIndicatorStyle: {backgroundColor: COLOR.green},
//         tabBarLabelStyle: {color: '#fff'},
//       })}>

//      <TopTab.Screen name="CHATS" component={MessageScreen}/>
//       <TopTab.Screen name="STATUS" component={StatusScreen}/>
//       <TopTab.Screen name="CALLS" component={CallScreen}/>
//     </TopTab.Navigator>
//   );
// }

import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {normalize} from '../utils/dimensions';
import {COLOR} from '../utils/color';
import ChatsScreen from '../screens/chat/homeChat/chats';
import CallScreen from '../screens/chat/homeChat/calls';
import StatusScreen from '../screens/chat/homeChat/status';

export default function TopTabNavigation() {
  const Tab = createMaterialTopTabNavigator();
  return (
    <Tab.Navigator
      sceneContainerStyle={{backgroundColor: 'black'}}
      screenOptions={({route}) => ({
        tabBarContentContainerStyle: {backgroundColor: 'black'},
        tabBarLabelStyle: {color: COLOR.WHITE, fontSize: 14, fontWeight: '800'},
        tabBarLabel: ({focused}) => {
          return (
            <Text
              style={
                focused
                  ? {
                      fontSize: 16,
                      color: COLOR.green,
                      fontWeight: '800',
                      width: normalize(60),
                    }
                  : {fontSize: 16, color: COLOR.WHITE, fontWeight: '800'}
              }>
              {route.name}
            </Text>
          );
        },
        tabBarIndicatorStyle: {backgroundColor: COLOR.green},
        tabBarStyle: {height: normalize(48)},
      })}>
      <Tab.Screen name="Chats" component={ChatsScreen} />
      <Tab.Screen name="Status" component={StatusScreen} />
      <Tab.Screen name="Calls" component={CallScreen} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({});
