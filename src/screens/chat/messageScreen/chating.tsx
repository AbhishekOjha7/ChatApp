import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {
  GiftedChat,
  Bubble,
  InputToolbar,
  Composer,
} from 'react-native-gifted-chat';
import {images} from '../../../utils/images';
import {normalize} from '../../../utils/dimensions';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import firestore from '@react-native-firebase/firestore';
import {COLOR} from '../../../utils/color';
export default function Chating({route}: {route: any}) {
  const navigation = useNavigation<any>();
  const {Name, UID} = route.params;
  const [messages, setMessages] = useState([]);
  const {Auth_Data} = useSelector((store: any) => store.authReducer);
  let UserId = Auth_Data?.user?.user?.uid;
  useEffect(() => {
    const docid = UID > UserId ? UserId + '-' + UID : UID + '-' + UserId;
    const subscribe = firestore()
      .collection('chatrooms')
      .doc(docid)
      .collection('messages')
      .orderBy('createdAt', 'desc')
      .onSnapshot(documentSnapshot => {
        const allmsg = documentSnapshot.docs.map(item => {
          return item.data();
        });
        allmsg.sort((a, b) => {
          return b.createdAt - a.createdAt;
        });
        //@ts-ignore
        setMessages(allmsg);
      });
    return subscribe;
  }, []);

  const getAllmsg = async () => {
    const docid = UID > UserId ? UserId + '-' + UID : UID + '-' + UserId;
    const querySanp = await firestore()
      .collection('chatrooms')
      .doc(docid)
      .collection('messages')
      .orderBy('createdAt', 'desc')
      .get();
    const allmsg = querySanp.docs.map(docSanp => {
      return docSanp.data();
    });
    //@ts-ignore
    setMessages(allmsg);
  };

  useEffect(() => {
    getAllmsg();
  }, []);

  const onSend = (messagesArray: any) => {
    const msg = messagesArray[0];
    messagesArray[0].createdAt = new Date().getTime();
    const mymsg = {
      ...msg,
      createdAt: new Date().getTime(),
    };
    setMessages(previousMessages => GiftedChat.append(previousMessages, mymsg));
    const docid = UID > UserId ? UserId + '-' + UID : UID + '-' + UserId;
    firestore()
      .collection('chatrooms')
      .doc(docid)
      .collection('messages')
      .doc(mymsg._id)
      .set(mymsg);
  };
  return (
    <View style={styles.parent}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: 70,
        }}>
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}>
            <Image style={styles.backimg} source={images.back} />
          </TouchableOpacity>
          <Text style={styles.mainView}>{Name}</Text>
        </View>

        <View style={styles.leftview}>
          <TouchableOpacity style={styles.searchImgTouchable}>
            <Image source={images.telephone} style={styles.searchImg} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.searchImgTouchable}>
            <Image style={styles.searchImg} source={images.video} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuTouchable}>
            <Image style={styles.threeDotImg} source={images.dot} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.line}></View>
      <GiftedChat
        messages={messages}
        onSend={text => onSend(text)}
        showUserAvatar
        user={{
          _id: UserId,
        }}
        renderBubble={props => {
          return (
            <Bubble
              {...props}
              wrapperStyle={{
                right: {
                  backgroundColor: COLOR.green,
                },
              }}
            />
          );
        }}
        renderInputToolbar={props => (
          <InputToolbar
            {...props}
            containerStyle={{backgroundColor: 'black'}}
            renderComposer={props1 => (
              <Composer {...props1} textInputStyle={{color: 'white'}} />
            )}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  parent: {
    flex: 1,
    backgroundColor: 'black',
  },
  backimg: {
    height: normalize(25),
    width: normalize(25),
    left: 6,
  },
  searchImg: {
    height: normalize(20),
    width: normalize(20),
    resizeMode: 'contain',
  },
  searchImgTouchable: {
    // marginLeft: normalize(10),
    borderColor: '#2f3d29',
    borderWidth: 1,
    borderRadius: normalize(10),
    backgroundColor: '#2f3d29',
    // padding:normalize(3)
    height: normalize(32),
    width: normalize(34),
    justifyContent: 'center',
    alignItems: 'center',
    margin: normalize(2),
  },
  threeDotImg: {
    height: normalize(25),
    width: normalize(25),
    resizeMode: 'contain',
  },
  menuTouchable: {
    borderColor: '#2f3d29',
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: '#2f3d29',
    height: normalize(32),
    width: normalize(34),
    justifyContent: 'center',
    alignItems: 'center',
    margin: normalize(2),
  },
  mainView: {
    color: 'white',
    left: normalize(15),
    fontSize: 18,
    fontWeight: '600',
  },
  leftview: {
    flexDirection: 'row',
  },
  line: {
    borderWidth: 0.8,
    borderColor: 'grey',
    width: normalize(370),
    alignSelf: 'center',
    marginTop: normalize(20),
  },
});
