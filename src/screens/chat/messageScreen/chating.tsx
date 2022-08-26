import {Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {GiftedChat, Bubble, InputToolbar, Send} from 'react-native-gifted-chat';
import {images} from '../../../utils/images';
import {normalize, vh} from '../../../utils/dimensions';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import firestore from '@react-native-firebase/firestore';
import {COLOR} from '../../../utils/color';
export default function Chating({route}: {route: any}) {
  const navigation = useNavigation<any>();
  const {Name, UID, pic,status} = route.params;
  const [messages, setMessages] = useState([]);
  const {Auth_Data} = useSelector((store: any) => store.authReducer);
  let UserId = Auth_Data?.user?.user?.uid;
  const [userStatus, setuserStatus] = useState('')
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
 
  useEffect(() => {
    const subscribe = firestore()
      .collection('Users')
      .doc(UID)
      .onSnapshot((documentSnapshot:any) => {
        console.log(documentSnapshot.data().isActive);
        setuserStatus(documentSnapshot.data().isActive);
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
  const renderSend = (props: any) => {
    return (
      <Send {...props}>
        <View style={styles.viewsendiconimg}>
          <Image source={images.sendIcon} style={styles.sendiconimg} />
        </View>
      </Send>
    );
  };
  return (
    <View style={styles.parent}>
      
       
      <View style={styles.innerview}>
        <View style={styles.namearrowview}>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}>
            <Image style={styles.backimg} source={images.back} />
          </TouchableOpacity>
          <View style={{alignItems: 'center'}}>
            <Image style={styles.userbackground} source={images.user} />
            <Image style={styles.profimg} source={{uri: pic}} />
          </View>
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
      {userStatus ==='online'  ? <Text style={styles.onlinetxt}>{'Online'}</Text> : 
       <Text style={styles.oflinetxt}>{'Ofline'}</Text>}
      <View style={styles.line}></View>
      <ImageBackground style={{height:'85%',width:'100%'}} source={images.peakpx}>
      <GiftedChat
      messagesContainerStyle={{height: vh(540),}}
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
                  left:normalize(40)
                },
                left:{
                  right:normalize(35)
                }
              }}
            />
          );
        }}
        renderInputToolbar={props => (
          <InputToolbar {...props} containerStyle={styles.containview} />
        )}
        renderSend={renderSend}
      />
      </ImageBackground>
       
     </View>
  );
}

const styles = StyleSheet.create({
  parent: {
    flex: 1,
    backgroundColor: 'black',
  },
  innerview: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: normalize(65),
    alignItems: 'center',
  },
  namearrowview: {
    flexDirection: 'row',
    alignItems: 'center',
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
    fontSize: 20,
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
    marginTop: normalize(10),
  },
  viewsendiconimg: {
    height: 30,
    width: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendiconimg: {
    height: '90%',
    width: '90%',
  },
  containview: {
    backgroundColor: 'white',
    height: normalize(40),
    marginHorizontal: normalize(15),
    borderRadius: 22,
    justifyContent: 'center',
    shadowColor: '#000',
  },
  userbackground: {
    height: normalize(40),
    width: normalize(40),
    left: normalize(10),
    borderRadius: normalize(100),
    resizeMode: 'cover',
  },
  profimg: {
    height: normalize(40),
    width: normalize(40),
    left: normalize(10),
    borderRadius: normalize(100),
    position: 'absolute',
  },
  onlinetxt:{
    color: COLOR.green,marginLeft:normalize(85),fontSize:15
  },
  oflinetxt:{
    color: COLOR.WHITE,marginLeft:normalize(85),fontSize:15
  }
});
