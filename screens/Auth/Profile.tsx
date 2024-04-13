import {Alert, Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import Layout from '../../components/Layout';
import {
  ActivityIndicator,
  Button,
  Switch,
  Text,
  TextInput,
} from 'react-native-paper';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import BottomDrawer, {
  BottomDrawerMethods,
} from 'react-native-animated-bottom-drawer';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {useDispatch, useSelector} from 'react-redux';
import {selectCurrentUser, setAuth} from '../../store/AuthSlice';
import storage from '@react-native-firebase/storage';
import auth from '@react-native-firebase/auth';
import uuid from 'react-native-uuid';
import {selectPrivate, setLoading, togglePrivate} from '../../store/AppSlice';
import {useNavigation} from '@react-navigation/native';
import {NavigationProps} from '../../types';

const Profile = () => {
  const dispatch = useDispatch();
  const isPrivate = useSelector(selectPrivate);
  const navigation = useNavigation<NavigationProps>();
  const user = useSelector(selectCurrentUser);
  const [name, setName] = useState(user?.name);
  const [email, setEmail] = useState(user?.email);
  const [image, setImage] = useState(
    user?.avatar ??
      'https://t3.ftcdn.net/jpg/05/53/79/60/360_F_553796090_XHrE6R9jwmBJUMo9HKl41hyHJ5gqt9oz.jpg',
  );
  const bottomDrawerRef = useRef<BottomDrawerMethods>(null);
  const uploadAvatar = async (asset: any) => {
    try {
      const extension = asset.fileName.split('.')[1];
      const filename = `${uuid.v4()}.${extension}`;
      await storage().ref(filename).putFile(asset.uri);
      const url = await storage().ref(filename).getDownloadURL();
      setImage(url);
      let user: any = auth().currentUser;
      await user.updateProfile({
        photoURL: url,
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
    } catch (error) {}
  };
  const handleCameraImagePicker = async () => {
    dispatch(setLoading(true));
    bottomDrawerRef.current?.close();
    try {
      const {assets}: any = await launchCamera({mediaType: 'photo'});
      if (assets.length >= 0) {
        await uploadAvatar(assets[0]);
      }
    } catch (error) {}
    dispatch(setLoading(false));
  };
  const handleMediaImagePicker = async () => {
    dispatch(setLoading(true));
    bottomDrawerRef.current?.close();
    try {
      const {assets}: any = await launchImageLibrary({mediaType: 'photo'});
      if (assets.length >= 0) {
        await uploadAvatar(assets[0]);
      }
    } catch (error) {}
    dispatch(setLoading(false));
  };

  const handleUpdateProfile = async () => {
    dispatch(setLoading(true));
    let user: any = auth().currentUser;
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
    dispatch(setLoading(false));
  };

  const handleLogout = async () => {
    dispatch(setLoading(true));
    await auth().signOut();
    navigation.reset({
      index: 0,
      routes: [{name: 'Login'}],
    });
    navigation.navigate('Login');
    dispatch(setLoading(false));
  };
  return (
    <Layout>
      <View
        style={{
          height: 200,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View
          style={{
            width: 150,
            height: 150,
          }}>
          <Image
            width={150}
            height={150}
            borderRadius={100}
            source={{
              uri: image,
            }}
            style={{borderWidth: 0.4, borderColor: '#ddd'}}
          />
          <TouchableOpacity
            onPress={() => bottomDrawerRef?.current?.open()}
            style={{
              backgroundColor: '#007bff',
              height: 45,
              width: 45,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 50,
              position: 'absolute',
              bottom: 0,
              right: 0,
            }}>
            <FontAwesome5Icon name="camera" color={'#fff'} size={24} />
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginHorizontal: 100,
          paddingVertical: 8,
          paddingHorizontal: 15,
          borderRadius: 50,
          borderColor: '#ddd',
          borderWidth: 0.5,
        }}>
        <Text variant="labelLarge">Private Mode</Text>
        <Switch
          value={isPrivate}
          onValueChange={() => dispatch(togglePrivate())}
        />
      </View>
      <View style={{marginTop: 20}}>
        <Text
          variant="labelLarge"
          style={{marginVertical: 10, paddingLeft: 10}}>
          Name
        </Text>
        <TextInput
          mode="outlined"
          value={name}
          placeholder="Name"
          onChangeText={text => setName(text)}
          style={{backgroundColor: '#eee'}}
          outlineStyle={{
            borderWidth: 1,
            borderColor: 'gray',
            borderRadius: 50,
            backgroundColor: 'transparent',
          }}
        />
        <Text
          variant="labelLarge"
          style={{marginVertical: 10, paddingLeft: 10}}>
          Email
        </Text>
        <TextInput
          mode="outlined"
          placeholder="Email"
          disabled={true}
          value={email}
          keyboardType="number-pad"
          onChangeText={text => setEmail(text)}
          style={{backgroundColor: '#eee'}}
          outlineStyle={{
            borderWidth: 1,
            borderColor: 'gray',
            borderRadius: 50,
            backgroundColor: 'transparent',
          }}
        />
        <Button
          mode="outlined"
          style={{marginTop: 20}}
          onPress={handleUpdateProfile}
          labelStyle={{color: '#fff'}}>
          Update Profile
        </Button>
        <Button
          mode="contained"
          style={{marginTop: 20}}
          onPress={() => {
            Alert.alert(
              'Logout',
              'Are you sure?',
              [
                {
                  text: 'Cancel',
                  onPress: () => console.log('Cancel Pressed'),
                  style: 'cancel',
                },
                {
                  text: 'OK',
                  onPress: () => handleLogout(),
                },
              ],
              {cancelable: false},
            );
          }}
          buttonColor="#339900"
          labelStyle={{color: '#fff'}}>
          Logout
        </Button>
      </View>
      {/* image or camera picker */}
      <BottomDrawer
        customStyles={{
          container: {backgroundColor: '#202124', maxHeight: 570},
        }}
        ref={bottomDrawerRef}>
        <View>
          <TouchableOpacity
            onPress={handleCameraImagePicker}
            style={{
              paddingHorizontal: 15,
              paddingVertical: 15,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Text variant="titleMedium">Camera</Text>
            <FontAwesome5Icon name="camera" size={20} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleMediaImagePicker}
            style={{
              paddingHorizontal: 15,
              paddingVertical: 15,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Text variant="titleMedium">Media Files</Text>
            <FontAwesome5Icon name="image" size={20} />
          </TouchableOpacity>
        </View>
      </BottomDrawer>
    </Layout>
  );
};

export default Profile;

const styles = StyleSheet.create({});
