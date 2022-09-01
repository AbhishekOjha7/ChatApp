import {
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {} from 'react';
import {useNavigation} from '@react-navigation/native';
import TopTabNav from '../../routes/toptabNav';
import {normalize} from '../../utils/dimensions';
import {images} from '../../utils/images';
const HomeScreen = () => {
  const navigation = useNavigation<any>();
  return (
    <SafeAreaView style={styles.parent}>
      <View style={styles.body}>
        <Text style={styles.headerText}>{'WhatsUp'}</Text>
        <TouchableOpacity style={styles.searchImgTouchable}>
          <Image source={images.search} style={styles.searchImg} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.menuTouchable}
          onPress={() => navigation.navigate('ProfileScreen')}>
          <Image style={styles.threeDotImg} source={images.dot} />
        </TouchableOpacity>
      </View>
      <TopTabNav />
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  parent: {
    flex: 1,
    backgroundColor: 'black',
    paddingTop:normalize(80)
  },
  whtsptxt: {
    color: 'white',
    fontSize: 22,
  },
  body: {
    flexDirection: 'row',
    marginLeft: normalize(15),
    marginBottom: normalize(10),
  },
  headerText: {
    fontSize: 22,
    fontWeight: '700',
    color: 'white',
    marginTop: normalize(10),
  },
  searchImg: {
    height: normalize(25),
    width: normalize(25),
    resizeMode: 'contain',
  },
  searchImgTouchable: {
    marginLeft: normalize(190),
    borderColor: '#2f3d29',
    borderWidth: 2,
    borderRadius: normalize(10),
    backgroundColor: '#2f3d29',
    padding:normalize(3)
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
    padding:normalize(2)
  },
});
