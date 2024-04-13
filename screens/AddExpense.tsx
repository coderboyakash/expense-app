import React, {useEffect, useRef, useState} from 'react';
import moment from 'moment';
import Layout from '../components/Layout';
import BottomDrawer, {
  BottomDrawerMethods,
} from 'react-native-animated-bottom-drawer';
import {setLoading} from '../store/AppSlice';
import {RootStackParamsList} from '../types';
import {useDispatch, useSelector} from 'react-redux';
import {selectCurrentUser} from '../store/AuthSlice';
import firestore from '@react-native-firebase/firestore';
import {Button, Text, TextInput} from 'react-native-paper';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import {Alert, StyleSheet, TouchableOpacity, View} from 'react-native';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import SelectMultiple from '../components/SelectMultiple/SelectMultiple';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {EXPENSE_TYPES, INCOME_TYPES, TRANSACTION_TYPE} from '../constants';
import {addTransaction} from '../store/TransactionSlice';
import DatePicker from 'react-native-date-picker';

const AddExpense = () => {
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const amountInputRef = useRef<any>(null);
  const dispatch = useDispatch();
  const user = useSelector(selectCurrentUser);
  const [image, setImage] = useState('');
  const bottomDrawerRef = useRef<BottomDrawerMethods>(null);
  const navigation = useNavigation<NavigationProp<RootStackParamsList>>();
  const [type, setType] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  useEffect(() => {
    // amountInputRef?.current?.focus();
  }, []);
  const handleCameraImagePicker = async () => {
    try {
      const {assets}: any = await launchCamera({mediaType: 'photo'});
      if (assets.length >= 0) {
        setImage(assets[0].uri);
      }
    } catch (error) {}
    bottomDrawerRef.current?.close();
  };
  const handleMediaImagePicker = async () => {
    try {
      const {assets}: any = await launchImageLibrary({mediaType: 'photo'});
      if (assets.length >= 0) {
        setImage(assets[0].uri);
      }
    } catch (error) {}
    bottomDrawerRef.current?.close();
  };
  const handleAddNewExpense = async () => {
    dispatch(setLoading(true));
    try {
      if (type.trim() === '' || amount.trim() === '') {
        return;
      }

      await firestore()
        .collection('Expenses')
        .add({
          type,
          amount,
          category,
          description,
          userId: user?.id,
          date: moment(date).format(),
        });
      dispatch(
        addTransaction({
          type,
          amount,
          category,
          date: moment(date).format(),
          description,
          userId: user?.id,
        }),
      );
    } catch (error) {
      Alert.alert('Something went wrong!');
    }
    dispatch(setLoading(false));
    navigation.navigate('Home');
  };
  return (
    <Layout>
      <Text variant="labelLarge" style={{marginVertical: 10, paddingLeft: 10}}>
        Transaction Type
      </Text>
      <SelectMultiple
        selectMultiple={false}
        options={[
          {label: 'Expense', value: 'expense'},
          {label: 'Income', value: 'income'},
        ]}
        onChange={items =>
          setType(items[0]?.label === undefined ? '' : items[0]?.label)
        }
        initialState={[{label: 'Expense', value: 'expense'}]}
      />
      <Text variant="labelLarge" style={{marginVertical: 10, paddingLeft: 10}}>
        Sub Category
      </Text>
      {type === TRANSACTION_TYPE.EXPENSE && (
        <SelectMultiple
          selectMultiple={false}
          options={EXPENSE_TYPES.map(option => {
            return {label: option.value, value: option.key};
          })}
          initialState={[{label: 'Food', value: 'food'}]}
          onChange={items =>
            setCategory(items[0]?.label === undefined ? '' : items[0]?.label)
          }
        />
      )}
      {type === TRANSACTION_TYPE.INCOME && (
        <SelectMultiple
          selectMultiple={false}
          options={INCOME_TYPES.map(option => {
            return {label: option.value, value: option.key};
          })}
          initialState={[{label: 'Salary', value: 'salary'}]}
          onChange={items =>
            setCategory(items[0]?.label === undefined ? '' : items[0]?.label)
          }
        />
      )}
      <Text variant="labelLarge" style={{marginVertical: 10, paddingLeft: 10}}>
        Amount
      </Text>
      <TextInput
        mode="outlined"
        ref={amountInputRef}
        placeholder="Amount"
        keyboardType="decimal-pad"
        onChangeText={text => {
          if (text.length <= 7) {
            setAmount(text);
          }
        }}
        style={{backgroundColor: '#eee'}}
        outlineStyle={{
          borderWidth: 1,
          borderColor: 'gray',
          borderRadius: 50,
          backgroundColor: 'transparent',
        }}
      />
      <Text variant="labelLarge" style={{marginVertical: 10, paddingLeft: 10}}>
        Description
      </Text>
      <TextInput
        mode="outlined"
        placeholder="Description (optional)"
        multiline={true}
        onChangeText={text => setDescription(text)}
        style={{backgroundColor: '#eee', paddingVertical: 10}}
        contentStyle={{padding: 10}}
        underlineStyle={{padding: 10}}
        outlineStyle={{
          borderWidth: 1,
          borderColor: 'gray',
          borderRadius: 10,
          backgroundColor: 'transparent',
          padding: 10,
        }}
      />
      <View
        style={{
          borderWidth: 0.5,
          borderColor: '#ddd',
          paddingVertical: 15,
          paddingLeft: 20,
          marginTop: 20,
          borderRadius: 50,
        }}>
        <TouchableOpacity onPress={() => setOpen(true)}>
          <Text>
            {date ? moment(date).format('MM-DD-YYYY') : 'Please select date'}
          </Text>
        </TouchableOpacity>
      </View>
      <DatePicker
        modal={true}
        open={open}
        date={date}
        mode="date"
        onConfirm={date => {
          setOpen(false);
          setDate(date);
        }}
        onCancel={() => {
          setOpen(false);
        }}
      />
      {/* {image && (
        <Image
          style={{width: '100%', height: 250, marginTop: 20, borderRadius: 20}}
          source={{
            uri: image,
          }}
        />
      )} */}
      {/* <Button
        style={{marginTop: 20}}
        mode="outlined"
        onPress={() => bottomDrawerRef?.current?.open()}
        labelStyle={{color: '#fff'}}>
        Choose photo (optional)
      </Button> */}
      <Button
        style={{marginTop: 20}}
        onPress={handleAddNewExpense}
        labelStyle={{color: '#fff'}}
        mode="outlined">
        Add
      </Button>

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

export default AddExpense;

const styles = StyleSheet.create({});
