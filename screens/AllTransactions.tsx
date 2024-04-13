import {FlatList, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useSelector} from 'react-redux';
import {selectTransactions} from '../store/TransactionSlice';
import TransactionCard from '../components/TransactionCard';

const AllTransactions = () => {
  const transactions = useSelector(selectTransactions);
  return (
    <>
      <FlatList
        scrollEnabled={true}
        data={transactions}
        renderItem={({item}: any) => <TransactionCard transaction={item} />}
      />
    </>
  );
};

export default AllTransactions;

const styles = StyleSheet.create({});
