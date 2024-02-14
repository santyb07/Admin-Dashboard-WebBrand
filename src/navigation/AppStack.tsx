import React, { useCallback, useRef, useState } from 'react'
import { Stack } from './AppNavigation';
import {BottomTabBar, BottomTabBarProps, createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import FeatherIcons from "react-native-vector-icons/Feather"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import FontAwesomeIcons from "react-native-vector-icons/FontAwesome"

import { colors } from '../utils/Constants';
import UploadImages from '../UploadImages';
import Leads from '../users/Leads';
import LeadDetails from '../users/LeadDetails';


export type BottomTabParamList ={
Leads: undefined,
 Main: undefined,
 Design: undefined,
 Grow: undefined,
 Business:undefined,
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
    initialRouteName='Leads'
    >  
         {/* <Tab.Screen 
         name="Main" 
         component={UploadImages}
         options={{
           tabBarLabel: 'Home',
           tabBarIcon: ({focused ,color, size}:any) => (
             <FeatherIcons name="home" color={color} size={24} />
         ),
    
       }
       } 
         /> */}
         {/* <Tab.Screen 
         name="Design" 
         component={UploadImages}
         options={()=>({
           tabBarLabel: 'Design',
          //  tabBarVisible: false,
           tabBarIcon: ({color, size}:any) => (
             <FeatherIcons name="layout" color={color} size={24} />
         ),
        })} 
         /> */}
         {/* <Tab.Screen 
         name="Grow" 
         component={UploadImages}
         options={()=>({
           tabBarLabel: 'Grow',
           tabBarIcon: ({color, size}:any) => (
             <MaterialCommunityIcons name="rocket-launch" color={color} size={24} />
             ),        
            })} 
            /> */}
         <Tab.Screen 
         name="Leads" 
         component={Leads}
         options={()=>({
           tabBarLabel: 'Leads',
           tabBarIcon: ({color, size}:any) => (
             <MaterialCommunityIcons name="account-group-outline" color={color} size={24} />
             ),
            headerShown:true,
            // headerLeft:
            })}
         />
          <Tab.Screen 
         name="Upload" 
         component={UploadImages}
         options={()=>({
           tabBarLabel: 'Upload',
           tabBarIcon: ({color, size}:any) => (
             <FontAwesomeIcons name="cloud-upload" color={color} size={24} />
             ),
             headerShown:true,
             
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
      <Stack.Screen name="LeadDetails" component={LeadDetails} options={{headerShown:true,title:''}}/>
  </Stack.Navigator>
  );
}

export default AppStack;