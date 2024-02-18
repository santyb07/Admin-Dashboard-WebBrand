import React, { useCallback, useRef, useState } from 'react'
import { Stack } from './AppNavigation';
import {BottomTabBar, BottomTabBarProps, createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import FeatherIcons from "react-native-vector-icons/Feather"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialIcons"
import FontAwesomeIcons from "react-native-vector-icons/FontAwesome"

import { colors } from '../utils/Constants';
import UploadImages from '../UploadImages';
import Leads from '../users/Leads';
import LeadDetails from '../users/LeadDetails';
import Categories from '../category/Categories';


export type BottomTabParamList ={
// Users: undefined,
Categories:undefined,
 Upload:undefined
}

const Tab = createBottomTabNavigator<BottomTabParamList>();

const HomeTabs=()=>(
  <Tab.Navigator
    screenOptions={{
      tabBarActiveTintColor: colors.ActiveColor,
      tabBarInactiveTintColor: colors.InactiveColor,
      tabBarStyle: {
        position: 'absolute',
        borderTopColor: 'rgba(0, 0, 0, .2)',
        paddingBottom:10,
        paddingTop:3,
        height:60
      },
      headerShown:false,
      tabBarLabelStyle:{fontFamily:'Montserrat-Medium',fontSize:12},
    }}
    backBehavior='initialRoute'
    initialRouteName='Categories'
    >  
         {/* <Tab.Screen 
         name="Users" 
         component={Leads}
         options={()=>({
           tabBarLabel: 'Users',
           tabBarLabelStyle:{fontFamily:'Montserrat-[Regular]'},
           tabBarIcon: ({color, size}:any) => (
             <FontAwesomeIcons name="users" color={color} size={24} />
             ),
            headerShown:true,
            // headerLeft:
            })}
         /> */}
          <Tab.Screen 
         name="Upload" 
         component={UploadImages}
         options={()=>({
           tabBarLabel: 'Upload',
           tabBarLabelStyle:{fontFamily:'Montserrat-[Regular]'},
           tabBarIcon: ({color, size}:any) => (
             <FontAwesomeIcons name="cloud-upload" color={color} size={24} />
             ),
             headerShown:true,
             tabBarHideOnKeyboard:true
             
       })}
         /> 
         <Tab.Screen 
         name="Categories" 
         component={Categories}
         options={()=>({
           tabBarLabel: 'Categories',
           tabBarLabelStyle:{fontFamily:'Montserrat-[Regular]'},
           tabBarIcon: ({color, size}:any) => (
             <MaterialCommunityIcons name="category" color={color} size={24} />
             ),
             headerShown:true,
             tabBarHideOnKeyboard:true
             
       })}
         /> 
     </Tab.Navigator>
)


function AppStack() {
  return (
    <Stack.Navigator
    screenOptions={{ 
              contentStyle: {backgroundColor: 'white'},
              animationTypeForReplace:"pop",
              // animation:"slide_from_right",
              headerTitleStyle:{fontFamily:'Montserrat-Medium'}
           }}
    >
      <Stack.Screen name="Home" 
      component={HomeTabs} 
      options={{
        headerShown:false,
        // title:'Design',
      }}
      />
      <Stack.Screen name="UserDetails" component={LeadDetails} options={{headerShown:true,title:'Details'}}/>
  </Stack.Navigator>
  );
}

export default AppStack;