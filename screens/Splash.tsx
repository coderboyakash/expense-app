import {StyleSheet} from 'react-native';
import React, {useEffect} from 'react';
import auth from '@react-native-firebase/auth';
import {useDispatch} from 'react-redux';
import {setAuth} from '../store/AuthSlice';
import AuthLayout from '../components/AuthLayout';
import {Text} from 'react-native-paper';

const Splash = ({navigation}: any) => {
  const dispatch = useDispatch();
  useEffect(() => {
    const checkLogin = async () => {
      if (auth().currentUser) {
        const user: any = await auth().currentUser;
        dispatch(
          setAuth({
            name: user.displayName,
            email: user.email,
            id: user.uid,
            avatar: user?.photoURL,
          }),
        );
        navigation.reset({
          index: 0,
          routes: [{name: 'Home'}],
        });
        navigation.navigate('Home');
      } else {
        navigation.navigate('Login');
      }
    };
    checkLogin();
  }, []);
  return (
    <AuthLayout>
      <Text>Splash</Text>
    </AuthLayout>
  );
};

export default Splash;

const styles = StyleSheet.create({});
