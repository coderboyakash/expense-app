import {Alert, Image, StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Button, Text, TextInput} from 'react-native-paper';
import Layout from '../../components/Layout';
import {
  NavigationAction,
  NavigationState,
  useNavigation,
} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import {useDispatch} from 'react-redux';
import {selectCurrentUser, setAuth} from '../../store/AuthSlice';
import {RootStackParamsList} from '../../types';
import AuthLayout from '../../components/AuthLayout';
import Icon from 'react-native-easy-icon';
import {setLoading} from '../../store/AppSlice';

type NavigationProps = NativeStackNavigationProp<RootStackParamsList>;
const Register = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation<NavigationProps>();
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const handleRegister = async () => {
    dispatch(setLoading(true));
    try {
      if (name.trim() === '' || email.trim() === '' || password.trim() === '') {
        dispatch(setLoading(false));
        Alert.alert('Please check your email or password');
        return;
      }
      const response = await auth().createUserWithEmailAndPassword(
        email,
        password,
      );
      console.log('🚀 ~ handleRegister ~ response:', response);
      let user: any = auth().currentUser;
      console.log('🚀 ~ handleRegister ~ user:', user);
      await user.updateProfile({
        displayName: name,
      });
      user = auth().currentUser;
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
    } catch (error) {
      Alert.alert(JSON.stringify(error));
    }
    dispatch(setLoading(false));
  };
  return (
    <AuthLayout>
      <View style={styles.registerWrapper}>
        <View style={styles.registerLogoWrapper}>
          <Icon type="feather" name="user-plus" color="#ddd" size={100} />
        </View>
        <View style={styles.registerFormWrapper}>
          <Text variant="labelLarge">Name</Text>
          <TextInput
            mode="outlined"
            value={name}
            placeholder="Name"
            style={styles.inputStyles}
            outlineStyle={styles.inputOutlineStyles}
            onChangeText={text => setName(text)}
          />
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
          <Button
            mode="contained-tonal"
            onPress={handleRegister}
            style={{marginTop: 15}}>
            Create new account
          </Button>
          <Button
            mode="outlined"
            style={{marginTop: 10}}
            onPress={() => {
              navigation.navigate('Login');
            }}>
            Back to login
          </Button>
        </View>
      </View>
    </AuthLayout>
  );
};

export default Register;

const styles = StyleSheet.create({
  registerWrapper: {
    width: '100%',
    height: '100%',
  },
  registerLogoWrapper: {
    height: '25%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  registerFormWrapper: {
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
