import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Image,
  ImageBackground,
  Dimensions,
} from 'react-native';
import React, {useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {useSelector, useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {COLOR} from '../../utils/color';
import {images} from '../../utils/images';
import {normalize} from '../../utils/dimensions';
import ImagePicker from 'react-native-image-crop-picker';
const {width, height} = Dimensions.get('screen');
export default function ProfileScreen() {
  //   const usersCollectionRef = firestore().collection('Users');
  const dispatch = useDispatch();
  const {Auth_Data} = useSelector((store: any) => store.authReducer);
  const [name, setName] = useState('');
  const [About, setAbout] = useState('');
  const [Email, setEmail] = useState('');
  const [coverimg, setCoverimg] = useState<any>();
  const navigation = useNavigation<any>();

  const Logout = () => {
    auth()
      .signOut()
      .then((res: any) => {
        console.log('User signed out!', res), navigation.navigate('SignIn');

        dispatch({type: 'signIn', payload: {}});
      })
      .catch((err: any) => {
        console.log('err', err);
      });
  };

  const UpdateDetails = () => {
    let uid = Auth_Data?.user?.user?.uid;
    firestore()
      .collection('Users')
      .doc(uid)
      .set({
        Name: name,
        Email: Email,
        About: About,
      })
      .then(res => {
        console.log('Response is', res);
        dispatch({type: 'Set_Data', payload: res});
        navigation.navigate('MessageScreen');
      })
      .catch(err => {
        console.log('Error is', err);
      });
  };
  const onChangeName = (text: any) => {
    setName(text);
  };
  const onChangeAbout = (text: any) => {
    setAbout(text);
  };

  const onChangeEmail = (text: any) => {
    setEmail(text);
  };
  const NaviagteGoback = () => {
    navigation.goBack();
  };
  const imageOpencover = async () => {
    //FUNCTION FOR COVER PICKER
    try {
      const image = await ImagePicker.openPicker({
        cropping: true,
        height: 150,
        width: 100,
      });
      setCoverimg(image.path);
    } catch (err) {
      console.log('ImageErr', err);
    }
  };
  return (
    <SafeAreaView style={styles.parent}>
      <View style={styles.headview}>
        <TouchableOpacity onPress={NaviagteGoback}>
          <Image style={styles.backimg} source={images.back} />
        </TouchableOpacity>
        <Text style={styles.profiletxt}>{'Profile'}</Text>
        <TouchableOpacity onPress={Logout}>
          <Image style={styles.logoutimg} source={images.logout} />
        </TouchableOpacity>
      </View>
      <View style={styles.line}></View>

      <TouchableOpacity onPress={imageOpencover} style={styles.imgContainer}>
        <Image style={styles.backgroundimg} source={images.account} />
        <Image style={styles.rectangleimg} source={{uri: coverimg}} />
      </TouchableOpacity>
      <View style={styles.line}></View>
      <View style={{marginTop: 20}}>
        <TextInput
          placeholder="Name"
          value={name}
          placeholderTextColor="white"
          style={{
            marginHorizontal: 20,
            padding: 10,
            borderWidth: 1,
            marginVertical: normalize(20),
            color: 'white',
            borderRadius: 20,
            height: normalize(45),
            backgroundColor: '#141414',
          }}
          onChangeText={onChangeName}
        />

        <TextInput
          placeholder="About"
          value={About}
          placeholderTextColor="white"
          onChangeText={onChangeAbout}
          style={{
            marginHorizontal: 20,
            padding: 10,
            borderWidth: 1,
            marginVertical: normalize(20),
            // borderColor: COLOR.WHITE,
            color: 'white',
            borderRadius: 20,
            height: normalize(45),
            backgroundColor: '#141414',
          }}
        />
        <TextInput
          placeholder="Email"
          placeholderTextColor="white"
          value={Email}
          onChangeText={onChangeEmail}
          style={{
            marginHorizontal: 20,
            padding: 10,
            borderWidth: 1,
            marginVertical: normalize(20),
            backgroundColor: '#141414',
            color: 'white',
            borderRadius: 20,
            height: normalize(45),
          }}
        />
      </View>

      <TouchableOpacity onPress={UpdateDetails} style={styles.updateview}>
        <Image style={styles.updateimg} source={images.update} />
      </TouchableOpacity>
      {/* <TouchableOpacity onPress={Logout}>
        <Text style={{fontSize: 22,color:COLOR.WHITE}}>{'LogOut'}</Text>
      </TouchableOpacity> */}
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  parent: {
    backgroundColor: COLOR.BLACK,
    flex: 1,
  },
  backimg: {
    height: normalize(25),
    width: normalize(30),
    margin: normalize(10),
  },
  headview: {
    flexDirection: 'row',
  },
  profiletxt: {
    color: COLOR.WHITE,
    fontSize: 20,
    margin: normalize(10),
  },
  logoutimg: {
    height: normalize(40),
    width: normalize(40),
    marginHorizontal: normalize(180),
  },
  line: {
    borderWidth: 0.8,
    borderColor: 'grey',
    width: 370,
    alignSelf: 'center',
    marginTop: normalize(20),
  },
  rectangleimg: {
    height: 120,
    width: 120,
    borderRadius: 100,
    position: 'absolute',
  },
  backgroundimg: {
    height: 120,
    width: 120,
    borderRadius: 100,
    backgroundColor: 'red',
    resizeMode: 'cover',
  },
  imgContainer: {
    marginVertical: 20,
    alignItems: 'center',
  },
  updateimg: {
    height: normalize(80),
    width: normalize(80),
  },
  updateview: {
    alignSelf: 'center',
  },
});
