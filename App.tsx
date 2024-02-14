/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect } from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import UploadImages from './src/UploadImages';
import AppNavigation from './src/navigation/AppNavigation';



function App(): React.JSX.Element {

  // useEffect(()=>{
  //   const getDetails= async()=>{ 
  //     const userDocument =await  firestore().collection('users').doc("aMNp3SSzOCX9QvBe7pGxEutGNiF2").get();
  //     console.log("userdata:",userDocument.data())
  //   }
  //   getDetails()
  // },[])
  return (
    <View className="flex-1 bg-white">
      <AppNavigation/>
    </View>
  );
}



export default App;
