import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Image,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import {images} from '../../utils/images';
import {normalize, vh, vw} from '../../utils/dimensions';
import CustomButton from '../../components/customButton';
import {COLOR} from '../../utils/color';
import CustomTextinput from '../../components/customTextinput';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useNavigation} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';

export default function SignIn() {
  const navigation = useNavigation<any>();
  const [checked, setChecked] = useState<boolean>(false);
  const [phoneno, setPhoneno] = useState<any>('');
  const [isLoading, setisLoading] = useState(false);
  const onPressCheck = () => {
    setChecked(!checked);
  };

  const signInWithMobileNumber = async () => {
    try {
      setisLoading(true);
      const confirmation = await auth().signInWithPhoneNumber('+91'+phoneno);
      navigation.navigate('OtpScreen', {phoneno, confirm: confirmation});
    } catch (err) {
      console.log('err', err);
    }
  };

  const navigateSignin = () => {
    navigation.navigate('SignIn');
  };
  return (
    <KeyboardAwareScrollView style={styles.parent}>
      <StatusBar barStyle={'light-content'} translucent={true} />
      <View style={styles.logoview}>
        <Image style={styles.logo} source={images.logo} />
      </View>
      <View style={styles.signtxt}>
        <Text style={styles.headtxt}>{'Sign to your account'}</Text>
      </View>
      <View style={styles.phonenoview}>
        <Text style={styles.phonetxt}>{'Phone Number*'}</Text>
      </View>

      <CustomTextinput onChangeText={(text: any) => setPhoneno(text)} />
      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity onPress={onPressCheck}>
          {checked ? (
            <Image style={styles.uncheckview} source={images.uncheck} />
          ) : (
            <Image style={styles.checkimg} source={images.check} />
          )}
        </TouchableOpacity>
        <Text style={styles.remembertxt}>{'Remember me'}</Text>
      </View>
      <CustomButton
        styleview={
          !checked
            ? styles.customButtonStyle
            : [styles.customButtonStyle, {backgroundColor: COLOR.grey}]
        }
        label="Sign in"
        NavigatePress={signInWithMobileNumber}
      />
      <View style={styles.dontview}>
        <Text style={styles.donttxt}>{'Already have an account?'}</Text>
        <TouchableOpacity onPress={navigateSignin}>
          <Text style={styles.signuptxt}>{'Sign up'}</Text>
        </TouchableOpacity>
      </View>
      {isLoading ? (
        <ActivityIndicator
          size={'large'}
          color={COLOR.green}
          style={styles.indicator}
        />
      ) : null}
    </KeyboardAwareScrollView>
  );
}
const styles = StyleSheet.create({
  parent: {
    flex: 1,
    backgroundColor: '#0d0d0d',
  },
  headtxt: {
    color: COLOR.WHITE,
    fontSize: 18,
    // position: 'absolute',
    // bottom: normalize(200),
    fontWeight: '500',
  },
  signtxt: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  customButtonStyle: {
    backgroundColor: COLOR.green,
    marginTop: 25,
  },
  phonenoview: {
    marginTop: 20,
  },
  phonetxt: {
    color: 'white',
    left: 20,
  },
  uncheckview: {
    height: 30,
    width: 30,
    borderRadius: 5,
    marginTop: 15,
    marginLeft: 15,
    tintColor: COLOR.green,
    resizeMode: 'contain',
  },
  checkimg: {
    height: 30,
    width: 30,
    tintColor: COLOR.green,
    marginTop: 15,
    marginLeft: 15,
    borderRadius: 5,
    resizeMode: 'contain',
  },
  remembertxt: {
    color: COLOR.WHITE,
    marginTop: 20,
    marginLeft: 15,
  },
  dontview: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: 20,
  },
  donttxt: {
    color: 'grey',
    fontSize: 16,
  },
  signuptxt: {
    color: COLOR.green,
    marginLeft: 10,
    fontSize: 18,
    fontWeight: 'bold',
  },
  indicator: {
    position: 'absolute',
    right: normalize(180),
    top: normalize(380),
  },
  logoview: {
    marginTop: 120,
  },

  logo: {
    height: vh(400),
    width: vw(375),
    opacity: 1.5,
  },
});
