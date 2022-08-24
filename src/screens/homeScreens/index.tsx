import {FlatList, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import {useNavigation} from '@react-navigation/native';
import TopTabNav from '../../routes/toptabNav';
const HomeScreen = () => {
  const [Name, setUserName] = useState<any>([]);
  const [about, setAbout] = useState<any>([]);
  const navigation = useNavigation<any>();
  //   console.log('jfbgj', Name);\\
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
      <View>
        <Text style={{color: 'white'}}>{item.Name}</Text>
      </View>
    );
  };
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'black'}}>
      <Text onPress={() => navigation.navigate('ProfileScreen')}>
        Go for Logout
      </Text>
      <View>
        <Text style={styles.whtsptxt}>{'WhatsUp'}</Text>
      </View>
      <TopTabNav />
      <FlatList
        data={Name}
        //@ts-ignore
        renderItem={_renderItem}
      />
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  whtsptxt: {
    color: 'white',
    fontSize: 22,
  },
});
