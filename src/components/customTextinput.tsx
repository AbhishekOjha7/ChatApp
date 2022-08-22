import { View, Text,Image,TextInput,StyleSheet } from 'react-native'
import React from 'react'
import { images } from '../utils/images'
import { normalize } from '../utils/dimensions'
import { COLOR } from '../utils/color'


export default function CustomTextinput(props:any) {
    const{onChangeText}=props;
  return (
    <View style={styles.textinputview}>
    <Image style={styles.phoneicon} source={images.phone}/>
    <TextInput
    {...props}
    placeholder='Phone Number'
    placeholderTextColor={'grey'}
    style={{color:'white',marginLeft:8,opacity:2,fontSize:18}}
    keyboardType='numeric'

    onChangeText={onChangeText}
    />
</View>
  )
}
const styles = StyleSheet.create({
    textinputview:{
        borderWidth: 1,
        width: normalize(345),
        marginLeft: normalize(15),
        borderRadius: normalize(20),
        marginTop: normalize(8),
        borderColor: 'grey',
        flexDirection: 'row',
        alignItems: 'center',
        height: normalize(45),
        paddingRight: normalize(20),
        marginHorizontal:30,
        backgroundColor:COLOR.grey
      },
      phoneicon:{
        height: normalize(20),
        width: normalize(20),
        marginLeft: normalize(20),
      }
})