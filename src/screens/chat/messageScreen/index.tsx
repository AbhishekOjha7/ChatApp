import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import {normalize} from '../../../utils/dimensions';
import {useDispatch, useSelector} from 'react-redux';
import {images} from '../../../utils/images';
export default function MessageScreen() {
  const navigation = useNavigation<any>();
  const {Auth_Data} = useSelector((store: any) => store.authReducer);
  let UserId = Auth_Data?.user?.user?.uid;
  const dispatch = useDispatch<any>();
  const [data, setData] = useState<any>([]);
  const [profile, setProfile] = useState<any>([]);
  const [allUsers, setUsers] = useState();

  useEffect(() => {
    firestore()
      .collection('Users')
      .onSnapshot(onchange => {
        let allUsers = onchange.docs.map(item => {
          return item.data();
        });
        //@ts-ignore
        setUsers(allUsers);
      });

    firestore()
      .collection('Users')
      .doc(UserId)
      .collection('inbox')
      .onSnapshot((documentSnapshot: any) => {
        let users = documentSnapshot?._docs?.map((item: any) => {
          return item._data;
        });
        setData(users);
      });
  }, []);

  const _renderItem = ({item}: any) => {
    const {isActive, name, pic, display, uid} = item;

    return (
      <View>
        <TouchableOpacity
          style={styles.flatlistview}
          onPress={() =>
            navigation.navigate('Chating', {
              Name: name,
              UID: uid,
              pic: item.display,
              status: isActive,
            })
          }>
          <Image style={styles.backimgprofile} source={images.user} />
          <Image source={{uri: item?.display}} style={styles.img} />
          <TouchableOpacity>
            <Text style={styles.name}>{name}</Text>
          </TouchableOpacity>
        </TouchableOpacity>
        <View style={styles.line}></View>
      </View>
    );
  };
  const NavigateAllcontact = () => {
    navigation.navigate('AllContact');
  };
  return (
    <View style={{flex: 1}}>
      <FlatList
        data={data}
        //@ts-ignore
        renderItem={_renderItem}
      />
      <TouchableOpacity onPress={NavigateAllcontact} style={styles.contactview}>
        <Image style={styles.contactimg} source={images.allcontacts} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  flatlistview: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  img: {
    height: normalize(60),
    width: normalize(60),
    borderRadius: normalize(100),
    position: 'absolute',
  },
  name: {
    color: 'white',
    margin: normalize(10),
    fontWeight: '500',
  },
  line: {
    borderWidth: 0.8,
    borderColor: 'grey',
    width: normalize(370),
    alignSelf: 'center',
    marginTop: normalize(10),
  },
  backimgprofile: {
    height: normalize(60),
    width: normalize(60),
    borderRadius: normalize(100),
    resizeMode: 'cover',
  },
  contactview: {
    justifyContent: 'flex-end',
    left: normalize(300),
  },
  contactimg: {
    height: normalize(60),
    width: normalize(60),
  },
});
