import React from 'react';
import {useSelector} from 'react-redux';
import {FlatList} from 'react-native';
import {selectExpenses} from '../store/TransactionSlice';
import TransactionCard from '../components/TransactionCard';
const Expenses = () => {
  const expenses = useSelector(selectExpenses);
  return (
    <>
      {expenses && (
        <FlatList
          scrollEnabled={true}
          data={expenses}
          renderItem={({item}: any) => <TransactionCard transaction={item} />}
        />
      )}
    </>
  );
};

export default Expenses;
