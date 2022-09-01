import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {normalize} from '../../../utils/dimensions';
import {images} from '../../../utils/images';
import {COLOR} from '../../../utils/color';
import {useNavigation} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import {useSelector} from 'react-redux';

const AllContact = () => {
  const navigation = useNavigation<any>();
  const [Name, setUserName] = useState<any>([]);
  const [status, setStatus] = useState(false);
  const {Auth_Data} = useSelector((store: any) => store.authReducer);
  let UserId = Auth_Data?.user?.user?.uid;
  useEffect(() => {
    firestore()
      .collection('Users')
      .where('uid', '!=', UserId)
      .get()
      .then(res => {
        //@ts-ignore
        let users = res?._docs?.map((item: any) => {
          return item._data;
        });
        setUserName(users);
      });
  }, []);

  useEffect(() => {
    const subscribe = firestore()
      .collection('Users')
      .doc(UserId)
      .onSnapshot((documentSnapshot: any) => {
        // console.log('documentSnapshot', documentSnapshot.data()?.isActive);
        setStatus(documentSnapshot.data()?.isActive);
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
    <View style={styles.parent}>
      <View style={styles.body}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}>
          <Image style={styles.arrowimg} source={images.back} />
        </TouchableOpacity>
        <Text style={styles.headerText}>{'Select contact'}</Text>
        <TouchableOpacity style={styles.searchImgTouchable}>
          <Image source={images.search} style={styles.searchImg} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuTouchable}>
          <Image style={styles.threeDotImg} source={images.dot} />
        </TouchableOpacity>
      </View>
      <View style={styles.line}></View>
      <FlatList
        data={Name}
        //@ts-ignore
        renderItem={_renderItem}
      />
    </View>
  );
};

export default AllContact;

const styles = StyleSheet.create({
  parent: {
    flex: 1,
    backgroundColor: 'black',
    paddingTop: 15,
  },
  whtsptxt: {
    color: 'white',
    fontSize: 22,
  },
  body: {
    flexDirection: 'row',
    marginTop: 50,
  },
  headerText: {
    fontSize: 24,
    fontWeight: '700',
    color: 'white',
    marginLeft: 5,
    marginTop: 8,
  },
  searchImg: {
    height: normalize(25),
    width: normalize(25),
    resizeMode: 'contain',
  },
  searchImgTouchable: {
    marginLeft: normalize(100),
    borderColor: '#2f3d29',
    borderWidth: 2,
    borderRadius: normalize(10),
    backgroundColor: '#2f3d29',
    padding: normalize(3),
  },
  threeDotImg: {
    height: normalize(25),
    width: normalize(25),
    resizeMode: 'contain',
  },
  menuTouchable: {
    marginLeft: normalize(9),
    borderColor: '#2f3d29',
    borderWidth: 2,
    borderRadius: normalize(10),
    backgroundColor: '#2f3d29',
    padding: normalize(2),
  },
  line: {
    borderWidth: 0.8,
    borderColor: 'grey',
    width: 370,
    alignSelf: 'center',
    marginTop: normalize(20),
  },
  arrowimg: {
    height: normalize(30),
    width: normalize(30),
    marginTop: normalize(6),
  },
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
  backimgprofile: {
    height: normalize(60),
    width: normalize(60),
    borderRadius: normalize(100),
    resizeMode: 'cover',
  },
});
