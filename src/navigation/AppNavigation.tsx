import React, { useEffect } from 'react'
import {NavigationContainer} from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import AppStack from './AppStack'
// import AppStack from './AppStack';
// import AuthStack from './AuthStack';
// import { useSelector } from 'react-redux';
// import { RootState } from '../redux/store/store';
// import SplashScreen from 'react-native-splash-screen';
// import { FirebaseAuthTypes } from '@react-native-firebase/auth';

// export type ScreenNames = ["Home", "Onboarding"] // type these manually
// export type RootStackParamList = Record<ScreenNames[number], {onboarded:boolean}>;
// export type StackNavigation = NavigationProp<RootStackParamList>;

export type RootStackParamList={
  Home:undefined,
  UserDetails:{ 
  businessName:string,
  mobileNumber:string,
  time:string,
  date:string,
  logo:string
  },
  Onboarding:undefined,
  Login:undefined,
  VerifyOtp:{
    mobileNumber:string,
    // confirmData:FirebaseAuthTypes.ConfirmationResult | null
  },
  // AccountOverview:undefined,
  // Templates:undefined,
  // AdsPackage:undefined,
  // AllLeads:undefined,
  // BusinessDetails: undefined,
  //New Navigation
  TemplateEditor:{
    templateImg:string,
    promotion:boolean,
  } | undefined,
  EditBusinessDetails:undefined,
  DownloadShareTemplate:{
    templateLocation:string,
  },
  ChooseFrame:undefined,
  TestNotification:undefined
}

export const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigation = () => {
  // const isUserLoggedIn = useSelector((state:RootState)=>state.auth.userId)

  
  // useEffect(()=>{
  //   if(isUserLoggedIn){
  //     SplashScreen.hide(); 
  //   }
  // },[])
  return (
    <NavigationContainer>
      {/* {
        isUserLoggedIn ? <AppStack/> : <AuthStack/>
      } */}
      <AppStack/>
    </NavigationContainer>
  )
}

export default AppNavigation