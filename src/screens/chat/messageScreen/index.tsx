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
import SignIn from '../../onboardingScreen/sign';
import {images} from '../../../utils/images';
export default function MessageScreen() {
  const [Name, setUserName] = useState<any>([]);
  const navigation = useNavigation<any>();
  const {Auth_Data} = useSelector((store: any) => store.authReducer);
  let UserId = Auth_Data?.user?.user?.uid;
  const dispatch = useDispatch<any>();
  const [status, setStatus] = useState(false);
  useEffect(() => {
    firestore()
      .collection('Users')
      .where('uid', '!=', UserId)
      .get()
      .then(res => {
        //@ts-ignore

        console.log('result', res._docs);
        //@ts-ignore
        let users = res?._docs?.map((item: any) => {
          return item._data;
        });

        console.log('resss', users);
        setUserName(users);
      });
  }, []);

  useEffect(() => {
    const subscribe = firestore()
      .collection('Users')
      .doc(UserId)
      .onSnapshot((documentSnapshot: any) => {
        console.log('documentSnapshot', documentSnapshot.data().isActive);
        setStatus(documentSnapshot.data().isActive);
      });
    return subscribe;
  });

  const _renderItem = ({item}: any) => {
    const {isActive} = item;
    return (
      <View>
        <TouchableOpacity
          style={styles.flatlistview}
          onPress={() =>
            navigation.navigate('Chating', {
              Name: item?.Name,
              UID: item?.uid,
              pic: item?.display,
              status: isActive,
            })
          }>
          <Image style={styles.backimgprofile} source={images.user} />
          <Image source={{uri: item.display}} style={styles.img} />
          <TouchableOpacity>
            <Text style={styles.name}>{item?.Name}</Text>
          </TouchableOpacity>
        </TouchableOpacity>
        <View style={styles.line}></View>
      </View>
    );
  };
  return (
    <View>
      <FlatList
        data={Name}
        //@ts-ignore
        renderItem={_renderItem}
      />
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
});
