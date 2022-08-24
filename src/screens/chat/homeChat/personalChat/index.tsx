import {StyleSheet, Text, TouchableOpacity, Image, View} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {images} from '../../../../utils/images';
import {normalize} from '../../../../utils/dimensions';
import {useNavigation} from '@react-navigation/native';
import {GiftedChat} from 'react-native-gifted-chat';
import firestore from '@react-native-firebase/firestore';

export default function PersonalChat({route}: any) {
  const {Name, Useruid, uid} = route.params;
  console.log('route items', Name, Useruid, uid);
  const navigation = useNavigation<any>();
  const [messages, setMessages] = useState([]);
  const getAllMessages = async () => {
    const docid = uid > Useruid ? Useruid + '-' + uid : uid + '-' + Useruid;
    const querySnap = await firestore()
      .collection('chatrooms')
      .doc(docid)
      .collection('messages')
      .orderBy('createdAt', 'desc')
      .get();
    const allmessage = querySnap.docs.map(docSnap => {
      return {
        ...docSnap.data(),
        createdAt: docSnap.data().createdAt.toDate(),
      };
    });
    setMessages(allmessage);
  };

  useEffect(() => {
    getAllMessages();
  }, []);

  const onSend = (messagesArray: any) => {
    const message = messagesArray[0];
    const mymessage = {
      ...message,
      sentBy: Useruid,
      sentTo: uid,
      createdAt: new Date(),
    };

    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, mymessage),
    );
    const docid = uid > Useruid ? Useruid + '-' + uid : uid + '-' + Useruid;
    firestore()
      .collection('chatrooms')
      .doc(docid)
      .collection('messages')
      .add({
        ...mymessage,
        createdAt: firestore.FieldValue.serverTimestamp(),
      });
  };

  const NavigationBack = () => {
    return navigation.goBack();
  };
  return (
    <View style={styles.container}>
      <View style={styles.body}>
        <View style={styles.headerStyle}>
          <TouchableOpacity onPress={NavigationBack}>
            <Image style={styles.back} source={images.back} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.userNameTextStyle}>{Name}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.headerStyle}>
          <TouchableOpacity style={styles.phoneImgTouchable}>
            <Image source={images.telephone} style={styles.phoneImg} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.videoCameraTouchable}>
            <Image
              style={styles.videoCameraImgStyle}
              source={images.videoCamera}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuTouchable}>
            <Image style={styles.threeDotImg} source={images.threeDot} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.lineSeparatorStyle} />
      <GiftedChat
        messages={messages}
        onSend={messages => onSend(messages)}
        user={{
          _id: Useruid,
        }}
      />
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
    marginTop: normalize(60),
    marginLeft: normalize(10),
    marginBottom: normalize(20),
    justifyContent: 'space-between',
  },
  headerStyle: {
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  back: {
    height: normalize(20),
    width: normalize(20),
    resizeMode: 'contain',
    marginTop: normalize(8),
  },
  userNameTextStyle: {
    color: 'white',
    fontSize: 18,
    fontWeight: '800',
    marginLeft: normalize(15),
    marginTop: normalize(8),
  },
  lineSeparatorStyle: {
    height: 1,
    width: '100%',
    backgroundColor: 'grey',
  },
  phoneImg: {
    height: normalize(20),
    width: normalize(20),
    resizeMode: 'contain',
    marginTop: normalize(5),
    marginLeft: normalize(5),
  },
  phoneImgTouchable: {
    marginLeft: normalize(90),
    borderColor: '#2f3d29',
    borderWidth: 2,
    borderRadius: 10,
    backgroundColor: '#2f3d29',
    width: normalize(30),
  },
  threeDotImg: {
    height: normalize(25),
    width: normalize(25),
    resizeMode: 'contain',
    marginTop: normalize(2),
  },
  videoCameraImgStyle: {
    height: normalize(20),
    width: normalize(25),
    resizeMode: 'contain',
    marginTop: normalize(10),
  },
  menuTouchable: {
    marginLeft: normalize(15),
    borderColor: '#2f3d29',
    borderWidth: 2,
    borderRadius: 10,
    backgroundColor: '#2f3d29',
  },
  videoCameraTouchable: {
    marginLeft: normalize(10),
    borderColor: '#2f3d29',
    borderWidth: 2,
    borderRadius: 10,
    backgroundColor: '#2f3d29',
  },
});
