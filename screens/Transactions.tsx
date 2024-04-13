import {StyleSheet, useWindowDimensions} from 'react-native';
import React from 'react';
import Layout from '../components/Layout';
import {SceneMap, TabBar, TabView} from 'react-native-tab-view';
import Expenses from './Expenses';
import Incomes from './Incomes';
import AllTransactions from './AllTransactions';
const renderScene = SceneMap({
  allTransaction: AllTransactions,
  expenses: Expenses,
  incomes: Incomes,
});
const Transactions = () => {
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'allTransaction', title: 'All'},
    {key: 'expenses', title: 'Expenses'},
    {key: 'incomes', title: 'Incomes'},
  ]);
  const renderTabBar = (props: any) => (
    <TabBar
      {...props}
      indicatorStyle={{backgroundColor: 'transparent'}}
      style={{backgroundColor: 'transparent'}}
      labelStyle={{fontSize: 12}}
    />
  );

  return (
    <Layout>
      <TabView
        sceneContainerStyle={{backgroundColor: 'transparent'}}
        style={{backgroundColor: 'transparent'}}
        pagerStyle={{backgroundColor: 'transparent', height: 10}}
        navigationState={{index, routes}}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{width: layout.width}}
        renderTabBar={renderTabBar}
      />
    </Layout>
  );
};

export default Transactions;

const styles = StyleSheet.create({});
