import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import {useDispatch} from 'react-redux';
import {normalize} from '../../../utils/dimensions';
import {STRINGS} from '../../../utils/strings';
import {images} from '../../../utils/images';
import TopTabNavigation from '../../../routes/toptabNav';
import firestore from '@react-native-firebase/firestore';

export default function HomeChatScreen() {
  const [name, setUserName] = React.useState<any>([]);
  const navigation = useNavigation<any>();
  const dispatch = useDispatch<any>();

  const Logout = () => {
    auth()
      .signOut()
      .then((res: any) => {
        console.log('User signed out', res), navigation.navigate('SignIn');
        dispatch({type: 'users', payload: {}});
      })
      .catch((err: any) => {
        console.log('error in logout', err);
      });
  };
  return (
    <View style={styles.container}>
      <View style={styles.body}>
        <Text style={styles.headerText}>{STRINGS.TEXT.WHATS_UP}</Text>
        <TouchableOpacity style={styles.searchImgTouchable}>
          <Image source={images.search} style={styles.searchImg} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.menuTouchable}
          onPress={() => {
            navigation.navigate('ProfileScreen');
          }}>
          <Image style={styles.threeDotImg} source={images.threeDot} />
        </TouchableOpacity>
      </View>
      <TopTabNavigation />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  body: {
    flexDirection: 'row',
    marginTop: normalize(50),
    marginLeft: normalize(15),
    marginBottom: normalize(10),
  },
  headerText: {
    fontSize: 18,
    fontWeight: '700',
    color: 'white',
    marginTop: normalize(10),
  },
  searchImg: {
    height: normalize(25),
    width: normalize(25),
    resizeMode: 'contain',
  },
  searchImgTouchable: {
    marginLeft: normalize(190),
    borderColor: '#2f3d29',
    borderWidth: 2,
    borderRadius: 10,
    backgroundColor: '#2f3d29',
  },
  threeDotImg: {
    height: normalize(25),
    width: normalize(25),
    resizeMode: 'contain',
  },
  menuTouchable: {
    marginLeft: normalize(15),
    borderColor: '#2f3d29',
    borderWidth: 2,
    borderRadius: 10,
    backgroundColor: '#2f3d29',
  },
});
