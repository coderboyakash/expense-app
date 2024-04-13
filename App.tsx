import {StyleSheet} from 'react-native';
import React from 'react';
import Home from './screens/Home';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import Login from './screens/Auth/Login';
import Register from './screens/Auth/Register';
import {Provider} from 'react-redux';
import {store} from './store';
import {PaperProvider, MD3DarkTheme} from 'react-native-paper';
import AddExpense from './screens/AddExpense';
import Transactions from './screens/Transactions';
import Splash from './screens/Splash';
import {RootStackParamsList} from './types';
import Profile from './screens/Auth/Profile';

const App = () => {
  const Stack = createNativeStackNavigator<RootStackParamsList>();
  return (
    <Provider store={store}>
      <PaperProvider theme={{...MD3DarkTheme}}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="Splash"
              component={Splash}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Login"
              component={Login}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Register"
              component={Register}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Home"
              component={Home}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="AddExpense"
              component={AddExpense}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Transactions"
              component={Transactions}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Profile"
              component={Profile}
              options={{headerShown: false}}
            />
            {/* <Stack.Screen name="Notifications" component={Notifications} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="Settings" component={Settings} /> */}
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </Provider>
  );
};

export default App;

const styles = StyleSheet.create({});
