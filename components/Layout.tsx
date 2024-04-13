import {
  View,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {ActivityIndicator, Text} from 'react-native-paper';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Feather from 'react-native-vector-icons/Feather';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamsList} from '../types';
import {useSelector} from 'react-redux';
import {selectLoading} from '../store/AppSlice';
type NavigationProps = NativeStackNavigationProp<RootStackParamsList>;

const Layout = ({children}: any) => {
  const loading = useSelector(selectLoading);
  const navigation = useNavigation<NavigationProps>();
  return (
    <View style={{backgroundColor: '#202124'}}>
      <StatusBar backgroundColor={'#202124'} />
      <SafeAreaView>
        <View style={{height: '100%'}}>
          <View
            style={{height: Dimensions.get('window').height - 80, margin: 10}}>
            {children}
          </View>
          <View
            style={{
              height: 60,
              backgroundColor: '#202124',
              flexDirection: 'row',
              width: '100%',
            }}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Home');
              }}
              style={{
                backgroundColor: '#202124',
                width: '25%',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <FontAwesome5 name="home" size={20} color="#fff" />
              <Text variant="labelSmall" style={{color: '#fff'}}>
                Home
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('AddExpense');
              }}
              style={{
                backgroundColor: '#202124',
                width: '26%',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Feather name="plus-square" size={20} color="#fff" />

              <Text variant="labelSmall" style={{color: '#fff'}}>
                Add Transaction
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Transactions');
              }}
              style={{
                backgroundColor: '#202124',
                width: '24%',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <FontAwesome5 name="money-bill-wave" size={20} color="#fff" />
              <Text variant="labelSmall" style={{color: '#fff'}}>
                Transactions
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Profile');
              }}
              style={{
                backgroundColor: '#202124',
                width: '25%',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <FontAwesome5 name="user" size={20} color="#fff" />
              <Text variant="labelSmall" style={{color: '#fff'}}>
                Profile
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
      {loading && (
        <ActivityIndicator
          style={{
            height: '100%',
            position: 'absolute',
            width: '100%',
            zIndex: 9,
            backgroundColor: '#000',
            opacity: 0.7,
          }}
          size={56}
        />
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  layoutStyles: {
    margin: 10,
  },
});
export default Layout;
