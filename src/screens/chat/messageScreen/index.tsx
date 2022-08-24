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
import {useSelector} from 'react-redux';
import { TabBarItem } from 'react-native-tab-view';

export default function MessageScreen() {
  const [Name, setUserName] = useState<any>([]);
  const navigation = useNavigation<any>();
  const {Auth_Data} = useSelector((store: any) => store.authReducer);
  let UserId = Auth_Data?.user?.user?.uid;
  
  useEffect(() => {
    firestore()
      .collection('Users')
      .where('uid','!=',UserId)
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
 
  const _renderItem = ({item}: any) => {
    // console.log('SSSS', item);
     console.log("other idddd",item);
    
    return (
        <TouchableOpacity style={styles.flatlistview} onPress={()=>navigation.navigate('Chating',{Name:item?.Name,UID:item?.uid})}>
          <Image source={{uri: item.display}} style={styles.img} />
          <TouchableOpacity>
            <Text style={styles.name}>{item?.Name}</Text>
          </TouchableOpacity>
        </TouchableOpacity>

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
    fontWeight:'500',
    
  },
});
