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
import {selectLoading} from '../store/AppSlice';
import {useSelector} from 'react-redux';
type NavigationProps = NativeStackNavigationProp<RootStackParamsList>;

const AuthLayout = ({children}: any) => {
  const loading = useSelector(selectLoading);
  const navigation = useNavigation<NavigationProps>();
  return (
    <View style={{backgroundColor: '#202124'}}>
      <StatusBar backgroundColor={'#202124'} />
      <SafeAreaView>
        <View style={{height: '100%', padding: 15}}>{children}</View>
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
export default AuthLayout;
