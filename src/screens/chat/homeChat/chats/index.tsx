import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {normalize} from '../../../utils/dimension';
import {useSelector} from 'react-redux';

export default function ChatsScreen() {
  const {users} = useSelector((store: any) => store.HomeReducer);
  console.log('users are there', users);
  return (
    <View>
      <Text style={{color: 'white'}}>ChatsScreen</Text>
    </View>
  );
}

const styles = StyleSheet.create({});
