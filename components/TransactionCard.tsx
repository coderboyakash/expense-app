import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useRef, useState} from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {Button, Dialog, Portal, Text} from 'react-native-paper';
import {Expense} from '../types';
import moment from 'moment';
import Entypo from 'react-native-vector-icons/Entypo';
import BottomDrawer, {
  BottomDrawerMethods,
} from 'react-native-animated-bottom-drawer';
interface Props {
  transaction: Expense;
}
const TransactionCard = ({transaction}: Props) => {
  const bottomDrawerRef = useRef<BottomDrawerMethods>(null);
  const [dialogVisible, setDialogVisible] = useState(false);
  return (
    <TouchableOpacity
      onPress={() => bottomDrawerRef?.current?.open()}
      style={{
        marginVertical: 10,
        marginHorizontal: 10,
        backgroundColor: '#303134',
        height: 70,
        borderRadius: 15,
        borderWidth: 1,
        borderColor: '#fff',
        flexDirection: 'row',
      }}>
      <View
        style={{
          height: '100%',
          width: '20%',
          borderTopLeftRadius: 20,
          borderBottomLeftRadius: 20,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View
          style={{
            padding: 10,
            borderRadius: 50,
            backgroundColor: transaction?.type === 'Expense' ? 'red' : 'green',
            borderWidth: 1,
            borderColor: '#fff',
          }}>
          <MaterialIcons
            name={transaction?.type === 'Expense' ? 'arrow-up' : 'arrow-down'}
            size={20}
            color={'#000'}
          />
        </View>
      </View>
      <View
        style={{
          height: '100%',
          width: '55%',
          padding: 15,
          justifyContent: 'center',
        }}>
        <View
          style={{
            alignContent: 'center',
            justifyContent: 'space-between',
            flexDirection: 'row',
            // backgroundColor: 'red',
          }}>
          <Text>₹{Number(transaction?.amount).toFixed(2)}</Text>
        </View>
        <Text>
          {transaction?.type[0].toUpperCase() + transaction?.type.slice(1)} ~{' '}
          {transaction?.description}
        </Text>
      </View>
      <View
        style={{
          height: '100%',
          width: '25%',
          borderTopRightRadius: 20,
          borderBottomRightRadius: 20,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <View style={{alignItems: 'flex-end'}}>
          <Text variant="labelSmall">
            {/* {transaction?.date} */}
            {moment(transaction?.date).format('DD MMM YY')}
          </Text>
          <View style={{flexDirection: 'row'}}>
            <FontAwesome5 name="money-bill-wave" color={'green'} size={20} />
          </View>
        </View>
      </View>

      <BottomDrawer
        customStyles={{
          container: {backgroundColor: '#202124', maxHeight: 570},
        }}
        ref={bottomDrawerRef}>
        <View>
          <TouchableOpacity
            // onPress={handleCameraImagePicker}
            style={{
              paddingHorizontal: 15,
              paddingVertical: 15,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Text variant="titleMedium">Edit</Text>
            <Entypo name="pencil" size={20} />
          </TouchableOpacity>
          <TouchableOpacity
            // onPress={handleCameraImagePicker}
            style={{
              paddingHorizontal: 15,
              paddingVertical: 15,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Text variant="titleMedium" style={{color: 'red'}}>
              Delete
            </Text>
            <Entypo name="trash" color={'red'} size={20} />
          </TouchableOpacity>
        </View>
      </BottomDrawer>
    </TouchableOpacity>
  );
};

export default TransactionCard;

const styles = StyleSheet.create({});
