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

export default function MessageScreen() {
  const [Name, setUserName] = useState<any>([]);
  const [about, setAbout] = useState<any>([]);
  const navigation = useNavigation<any>();
  let UserData = [];
  useEffect(() => {
    firestore()
      .collection('Users')
      .get()
      .then(querySnapshot => {
        // console.log('Total users: ', querySnapshot.size);
        querySnapshot.forEach(documentSnapshot => {
          const UserName = documentSnapshot.data();
          setUserName((p: any) => [...p, UserName]);
          console.log('User Name:=====> ', UserName);
        });
      });
  }, []);
  const _renderItem = ({item}: any) => {
    console.log('bjd===>', item);
    return (
      <View style={styles.flatlistview}>
        <Image source={{uri: item.display}} style={styles.img} />
        <TouchableOpacity>
          <Text style={styles.name}>{item.Name}</Text>
        </TouchableOpacity>
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
  },
  img: {
    height: normalize(60),
    width: normalize(60),
    borderRadius: normalize(100),
  },
  name: {
    color: 'white',
    margin: normalize(10),
  },
});
