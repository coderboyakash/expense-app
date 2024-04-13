import React from 'react';
import {useSelector} from 'react-redux';
import {FlatList} from 'react-native';
import {selectIncomes} from '../store/TransactionSlice';
import TransactionCard from '../components/TransactionCard';

const Incomes = () => {
  const incomes = useSelector(selectIncomes);
  return (
    <FlatList
      scrollEnabled={true}
      data={incomes}
      renderItem={({item}: any) => <TransactionCard transaction={item} />}
    />
  );
};

export default Incomes;
