/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import firebaseapp from "@react-native-firebase/app"

const firebaseConfig = {
  apiKey: "AIzaSyAkZ5ZhExrhoMbcnZndL45MccI_QJ7yk3U",
  authDomain: "expense-tracker-c8ffe.firebaseapp.com",
  projectId: "expense-tracker-c8ffe",
  storageBucket: "expense-tracker-c8ffe.appspot.com",
  messagingSenderId: "656298026691",
  appId: "1:656298026691:web:84857ff73b5b049117a476",
  measurementId: "G-NVB8T3D2CK",
  databaseURL: "https://expense-tracker-c8ffe-default-rtdb.firebaseio.com/"
};
if (firebaseapp.apps.length === 0) {
  firebaseapp.initializeApp(firebaseConfig);
}
// Initialize Firebase

AppRegistry.registerComponent(appName, () => App);
