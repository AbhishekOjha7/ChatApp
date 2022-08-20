import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';
import {normalize} from '../utils/dimensions';
import { COLOR } from '../utils/color';

export default function CustomButton(props:any) {
  const {NavigatePress,styleview,label}=props;
  return (
    <View style={{flex:1}}>

    <TouchableOpacity onPress={NavigatePress} style={[styles.buttonview,styleview]}>
      <Text style={[styles.txtcontinue]}>{label}</Text>
    </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  buttonview: {
    // position: 'absolute',
    // bottom: normalize(70),
    // marginTop:40,
    backgroundColor: COLOR.green,
    borderRadius: normalize(20),
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    height: normalize(48),
    width: normalize(350),
  },
  txtcontinue: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
});
