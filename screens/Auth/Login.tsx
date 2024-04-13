import {Alert, Image, StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import Layout from '../../components/Layout';
import {Button, Text, TextInput} from 'react-native-paper';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import {useDispatch} from 'react-redux';
import {selectCurrentUser, setAuth} from '../../store/AuthSlice';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {NavigationProps, RootStackParamsList} from '../../types';
import AuthLayout from '../../components/AuthLayout';
import Icon from 'react-native-easy-icon';
import {setLoading} from '../../store/AppSlice';

const Login = ({}) => {
  const navigation = useNavigation<NavigationProps>();
  const dispatch = useDispatch();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const handleLogin = async () => {
    dispatch(setLoading(true));
    try {
      if (email.trim() === '' || password.trim() === '') {
        dispatch(setLoading(false));
        Alert.alert('Please check your email or password');
        return;
      }
      const response = await auth().signInWithEmailAndPassword(email, password);
      const user: any = auth().currentUser;
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
    } catch (error: any) {
      Alert.alert(error.message.replace(`[${error.code}]`, '').trim());
    }
    dispatch(setLoading(false));
  };
  return (
    <AuthLayout>
      <View style={styles.loginLogoWrapper}>
        <Icon type="antdesign" name="login" color="#ddd" size={100} />
      </View>
      <View style={styles.loginFormWrapper}>
        <Text variant="labelLarge">Email</Text>
        <TextInput
          mode="outlined"
          value={email}
          placeholder="Email"
          style={styles.inputStyles}
          outlineStyle={styles.inputOutlineStyles}
          keyboardType="email-address"
          onChangeText={text => setEmail(text)}
        />
        <Text variant="labelLarge">Password</Text>
        <TextInput
          mode="outlined"
          value={password}
          placeholder="Password"
          secureTextEntry={true}
          style={styles.inputStyles}
          outlineStyle={styles.inputOutlineStyles}
          onChangeText={text => setPassword(text)}
        />
        <Button mode="contained-tonal" onPress={handleLogin}>
          Login
        </Button>
        <Button
          mode="outlined"
          style={{marginTop: 10}}
          onPress={() => {
            navigation.navigate('Register');
          }}>
          Create new account
        </Button>
      </View>
    </AuthLayout>
  );
};

export default Login;

const styles = StyleSheet.create({
  loginLogoWrapper: {
    height: '30%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginFormWrapper: {
    height: '70%',
  },
  inputStyles: {
    marginVertical: 10,
  },
  inputOutlineStyles: {
    borderRadius: 50,
    borderWidth: 1,
    borderColor: 'gray',
    backgroundColor: 'transparent',
  },
});
