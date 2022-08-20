import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import React, {useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {useSelector, useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
export default function ProfileScreen() {
  //   const usersCollectionRef = firestore().collection('Users');
  const dispatch = useDispatch();
  const {Auth_Data} = useSelector((store: any) => store.authReducer);
  const [name, setName] = useState('');
  const [About, setAbout] = useState('');
  const [Email, setEmail] = useState('');
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
        navigation.navigate('MessageScreen')
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
  return (
    <SafeAreaView style={{backgroundColor: 'aqua', flex: 1}}>
      <TextInput
        placeholder="Name"
        value={name}
        style={{
          marginHorizontal: 20,
          padding: 10,
          borderWidth: 1,
          marginVertical: 5,
        }}
        onChangeText={onChangeName}
      />
      <TextInput
        placeholder="About"
        value={About}
        onChangeText={onChangeAbout}
        style={{
          marginHorizontal: 20,
          padding: 10,
          borderWidth: 1,
          marginVertical: 5,
        }}
      />
      <TextInput
        placeholder="Email"
        value={Email}
        onChangeText={onChangeEmail}
        style={{
          marginHorizontal: 20,
          padding: 10,
          borderWidth: 1,
          marginVertical: 5,
        }}
      />
      <TouchableOpacity onPress={UpdateDetails}>
        <Text style={{fontSize: 22}}>{'Update Details'}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={Logout}>
        <Text style={{fontSize: 22}}>{'LogOut'}</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
