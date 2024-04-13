import {
  Alert,
  Dimensions,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Layout from '../components/Layout';
import {Button, ProgressBar, Text} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import {selectCurrentUser} from '../store/AuthSlice';
import TransactionCard from '../components/TransactionCard';
import {useNavigation} from '@react-navigation/native';
import {NavigationProps} from '../types';
import firestore from '@react-native-firebase/firestore';
import {TRANSACTION_TYPE} from '../constants';
import {selectPrivate} from '../store/AppSlice';
import {
  selectTotalExpense,
  selectTotalIncome,
  selectTransactions,
  setTransactions,
} from '../store/TransactionSlice';

const Home = () => {
  const navigation = useNavigation<NavigationProps>();
  const dispatch = useDispatch();
  const isPrivate = useSelector(selectPrivate);
  const user = useSelector(selectCurrentUser);
  const totalIncome = useSelector(selectTotalIncome);
  const transactions = useSelector(selectTransactions);
  const totalExpense = useSelector(selectTotalExpense);
  useEffect(() => {
    const getExpenses = async () => {
      try {
        const {docs} = await firestore()
          .collection('Expenses')
          .orderBy('date', 'desc')
          .where('userId', '==', user?.id)
          .get();
        dispatch(setTransactions(docs.map(item => item.data())));
      } catch (error) {
        console.log('🚀 ~ getExpenses ~ error:', error);
      }
    };
    getExpenses();
  }, []);
  const progress: any = (Number(totalExpense) / Number(totalIncome)).toFixed(2);
  return (
    <Layout>
      <View
        style={{
          justifyContent: 'space-between',
          flexDirection: 'row',
          alignItems: 'center',
          borderWidth: 1,
          borderColor: '#fff',
          borderRadius: 15,
          padding: 20,
          backgroundColor: '#303134',
          shadowColor: 'black',
          shadowOffset: {
            width: 0,
            height: 12,
          },
          shadowOpacity: 0.58,
          shadowRadius: 16.0,
          elevation: 5,
        }}>
        <View>
          <Text variant="headlineSmall">Good morning 🌞</Text>
          <Text variant="labelLarge">{user?.name}!</Text>
        </View>
        <View>
          <Image
            height={50}
            width={50}
            borderRadius={50}
            source={{
              uri:
                user?.avatar ??
                'https://t3.ftcdn.net/jpg/05/53/79/60/360_F_553796090_XHrE6R9jwmBJUMo9HKl41hyHJ5gqt9oz.jpg',
            }}
          />
        </View>
      </View>
      <View
        style={{
          flexDirection: 'row',
        }}>
        <View
          style={{
            width: Dimensions.get('window').width / 2 - 40,
            backgroundColor: '#303134',
            borderWidth: 1,
            borderColor: '#fff',
            height: 60,
            margin: 15,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 50,
          }}>
          <Text>Expense</Text>
          <Text>₹{isPrivate ? 'XXXXX' : totalExpense.toFixed(2)}</Text>
        </View>
        <View
          style={{
            width: Dimensions.get('window').width / 2 - 40,
            backgroundColor: '#303134',
            borderWidth: 1,
            borderColor: '#fff',
            height: 60,
            margin: 15,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 50,
          }}>
          <Text>Income</Text>
          <Text>₹{isPrivate ? 'XXXXX' : totalIncome.toFixed(2)}</Text>
        </View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
        }}>
        <View
          style={{
            width: Dimensions.get('window').width / 2 - 40,
            backgroundColor: '#303134',
            borderWidth: 1,
            borderColor: '#fff',
            height: 60,
            margin: 15,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 50,
          }}>
          <Text>Balance</Text>
          <Text>
            ₹{isPrivate ? 'XXXXX' : (totalIncome - totalExpense).toFixed(2)}
          </Text>
        </View>
      </View>
      <View>
        {/* <ProgressBar
          progress={1 - progress}
          color={'#fff'}
          style={{height: 20, borderRadius: 50}}
        /> */}
      </View>
      <View>
        <View
          style={{
            justifyContent: 'space-between',
            flexDirection: 'row',
          }}>
          <Text variant="bodyLarge">Current Transactions</Text>
          <Button
            mode="text"
            onPress={() => {
              navigation.navigate('Transactions');
            }}>
            See all
          </Button>
        </View>
        <View
          style={{
            borderRadius: 20,
            height: 200,
          }}>
          {transactions && transactions.length > 0 ? (
            <FlatList
              scrollEnabled={false}
              data={transactions.slice(0, 2)}
              renderItem={({item}: any) => (
                <TransactionCard transaction={item} />
              )}
            />
          ) : (
            <Text variant="labelLarge">No current transaction found!</Text>
          )}
        </View>
      </View>
    </Layout>
  );
};

export default Home;

const styles = StyleSheet.create({});
