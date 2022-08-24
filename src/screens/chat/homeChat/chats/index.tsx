import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import {normalize} from '../../../../utils/dimensions';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';

export default function ChatsScreen() {
  // const {users} = useSelector((store: any) => store.HomeReducer);
  // console.log('users are there', users);
  const [Name, setUserName] = useState<any>([]);
  const navigation = useNavigation<any>();
  const {Auth_Data} = useSelector((store: any) => store.authReducer);
  let Useruid = Auth_Data?.user?.user?.uid;
  console.log('uiddddddd', Useruid);

  useEffect(() => {
    firestore()
      .collection('Users')
      .where('uid', '!=', Useruid)
      .get()
      // .then(querySnapshot => {
      //   // console.log('Total users: ', querySnapshot.size);
      //   querySnapshot.forEach(documentSnapshot => {
      //     const UserName = documentSnapshot.data();
      //     setUserName((p: any) => [...p, UserName]);
      //     console.log('User Name:=====> ', UserName);
      //   });
      // });
      .then(response => {
        console.log('ressss', response._docs);

        let userss = response?._docs?.map((item: any) => {
          return item?._data;
        });
        console.log('userssss', userss);
        setUserName(userss);
      });
  }, []);

  const _renderItem = ({item}: any) => {
    console.log('bjd===>', item);
    return (
      <TouchableOpacity
        style={{height: normalize(50)}}
        onPress={({route}: any) => {
          navigation.navigate('PersonalChat', {
            Name: item?.Name,
            uid: item?.uid,
            Useruid: Auth_Data?.user?.user?.uid,
          });
        }}>
        <Text style={styles.userNameTextStyle}>{item?.Name}</Text>
      </TouchableOpacity>
    );
  };
  const _ItemSeparator = () => {
    return <View style={styles.itemSeparatorStyle} />;
  };
  return (
    <View>
      <FlatList
        data={Name}
        renderItem={_renderItem}
        ItemSeparatorComponent={_ItemSeparator}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  itemSeparatorStyle: {
    height: 1,
    width: '100%',
    backgroundColor: 'grey',
  },
  userNameTextStyle: {
    color: 'white',
    justifyContent: 'center',
  },
});
