import {
  View,
  Text,
  StyleSheet,
  Image,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {COLOR} from '../../utils/color';
import {images} from '../../utils/images';
import {normalize} from '../../utils/dimensions';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import CustomButton from '../../components/customButton';
import {useNavigation} from '@react-navigation/native';
import { firebase } from '@react-native-firebase/auth';
import { useDispatch,useSelector } from 'react-redux';
export default function OtpScreen({route}: {route: any}) {
  const navigation = useNavigation<any>();
  const {phoneno,confirm} = route.params;
  const [otp, setOtp] = useState<any>('');
  const otpRef = useRef<any>();
 const dispatch=useDispatch();

// console.log("confirm",confirm)
//  

// const {Auth_Data}=useSelector((store:any)=>store. authReducer);

// console.log("yyyyyy",Auth_Data);



  async function confirmCode() {
    try {
      let user=await confirm.confirm(otp);
      
      dispatch({type:'signIn',payload:{user}})
      navigation.navigate('ProfileScreen')
      console.log('user',user)
    } catch (error:any) {
      console.log('Invalid code.',error?.message);
    }
  }
//   console.log("tyui",otp);
//    const confirmCode=()=>{
//        try{
//            confirm.confirm(otp)
//        }
//        catch(error){
//            console.log("invvvv");
           
//        }
//    }

  return (
    <SafeAreaView style={styles.parent}>
      <View style={styles.headerview}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image style={styles.arrow} source={images.back}/>
        </TouchableOpacity>
        <Text style={styles.otptxt}>{'Enter OTP Code'}</Text>
      </View>
      <View>
        <View style={styles.phoneno}>
          <Text style={{color: 'white', fontSize: 18}}>
            Code has been sent to {phoneno}
          </Text>
        </View>
        <OTPInputView
          code={otp}
          pinCount={6}
          ref={otpRef}
          autoFocusOnLoad={true}
          style={styles.otpInputContainer}
          onCodeChanged={value => setOtp(value)}
          codeInputFieldStyle={styles.codeInputField}
          onCodeFilled={() => {}}
        />
      </View>
      <CustomButton
        styleview={styles.verfiybutton}
        label="Verify"
        NavigatePress={confirmCode}
      />
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  parent: {
    flex: 1,
    backgroundColor: COLOR.BLACK,
  },
  arrow: {
    height: normalize(25),
    width: normalize(25),
    left: normalize(5),
  },
  otptxt: {
    color: COLOR.WHITE,
    fontSize: 18,
    fontWeight: '500',
    left: normalize(25),
  },
  headerview: {
    flexDirection: 'row',
  },
  otpInputContainer: {
    height: normalize(48),
    borderRadius: normalize(5),
    marginTop: normalize(50),
  },
  codeInputField: {
    height: normalize(48),
    width: normalize(38),
    borderRadius: normalize(10),
    fontSize: normalize(20),
    textAlign: 'center',
    color: COLOR.WHITE,
    // fontFamily: fontFamily.HelveticaBold,
    fontWeight: '900',
    borderColor: COLOR.green,
  },
  verfiybutton: {
    marginTop: normalize(280),
  },
  phoneno: {
    marginTop: 250,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
