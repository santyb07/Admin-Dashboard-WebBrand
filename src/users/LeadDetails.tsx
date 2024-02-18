import { View, Text, ScrollView, Image, TouchableOpacity, Platform, Linking } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useRoute } from '@react-navigation/native';
import FontAwesomeIcons from "react-native-vector-icons/FontAwesome"
import FontAwesomeIcons5 from "react-native-vector-icons/FontAwesome5Pro"
import MaterialIcons from "react-native-vector-icons/MaterialCommunityIcons"
import { colors } from '../utils/Constants';

interface LeadDetailsParams{ 
    businessName:string,
    mobileNumber:string,
    time:string,
    date:string,
    logo:string
    }
const LeadStatus=['Interested','Not connected','In Progeress','Not Answered','Converted','Visited','Dead']
const LeadDetails = (props:any) => {
    const route= useRoute();
    const {businessName, mobileNumber,time,date,logo} = route.params as LeadDetailsParams;;
    const [status,setStatus]= useState('Added');
    // console.log(logo)
    let phoneNumber='';

    const changeStatus=(val:string)=>{
        setStatus(val);
    }
    const makeCall=()=>{
        if(Platform.OS ==='android'){
            phoneNumber= `tel:${mobileNumber}`
        }else{
            phoneNumber= `teleprompt:${mobileNumber}`
        }
        Linking.openURL(phoneNumber)
        console.log('opening dialpad')
    }
    const sendMessage=()=>{
        if(Platform.OS ==='android'){
            phoneNumber= `+91${mobileNumber}`
        }else{
            phoneNumber= `+91${mobileNumber}`
        }
        Linking.openURL(`sms:${phoneNumber}`)
        console.log('opening sms app')
    }
    const sendWhatsapp=()=>{
        Linking.openURL(`whatsapp://send?text=${'Welcome to WebBrand'}&phone=+91${mobileNumber}`)
        console.log('opening whatsapp')
    }
  return (
    <View className='flex-1 bg-white'>
        <View className='w-full flex-row space-x-8 px-4 py-4'>
            <View className='flex-1 flex-col justify-around space-y-8 '>
                <View className='flex-col space-y-2'>
                <Text className='font-[Montserrat-Bold] text-xl text-gray-700' numberOfLines={2} ellipsizeMode="tail">{businessName? businessName:"Lead"}</Text>
                <Text className='font-[Montserrat-Bold] text-xl text-blue-500'>+91 {mobileNumber}</Text>
                <Text className='font-[Montserrat-Bold] text-xl text-blue-500'>{status}</Text>
                </View>
                <View className='flex-row space-x-4'>
                <FontAwesomeIcons name={'phone'} size={22} color='white' onPress={makeCall}
                style={{backgroundColor:colors.ActiveColor,paddingVertical:10,paddingHorizontal:13,borderRadius:30 }}/>
                <MaterialIcons name={'android-messages'} size={22} color='white' onPress={sendMessage}
                        style={{backgroundColor:'#0064FF',paddingVertical:10,paddingHorizontal:11,borderRadius:30 }}/>
                <FontAwesomeIcons name={'whatsapp'} size={22} color='white' onPress={sendWhatsapp}
                style={{backgroundColor:'#25D366',paddingVertical:10,paddingHorizontal:12,borderRadius:30 }}
                />
                </View>
            </View>
            <View className='justify-around items-center space-y-2 mt-4'>
                <Image source={{uri:logo? logo: 'https://cdn.pixabay.com/photo/2024/01/02/14/58/leaf-8483401_1280.jpg'}} 
                height={100} 
                width={100} 
                resizeMode='cover'
                style={{borderRadius:20}}
                />
                <View>
                <Text className='font-[Montserrat-Bold] text-sm text-gray-500'>{time}</Text>
                <Text className='font-[Montserrat-Bold] text-sm text-gray-500'>{date}</Text>
                </View>
            </View>
        </View>
        <View className='border-b border-gray-300'>
        </View>
        {/* <View className='px-4 py-4
        '>
            <Text className='font-[Montserrat-SemiBold] text-lg text-gray-700'>Status</Text>
            <View className='flex-row items-center justify-start flex-wrap  space-y-4'>
                {
                    
                    LeadStatus.map((val,index)=>(
                            status==val ?
                            <TouchableOpacity onPress={()=>changeStatus(val)} key={index}>
                            <View key={index} className='border border-blue-600 bg-blue-100 mr-2 px-2 py-1 rounded-2xl'>
                            <Text className='font-[Montserrat-SemiBold] text-blue-700'>{val}</Text>
                            </View>
                            </TouchableOpacity>
                            :
                            <TouchableOpacity onPress={()=>changeStatus(val)}>
                            <View key={index} className='border border-gray-300 mr-2 px-2 py-1 rounded-2xl'>
                            <Text className='font-[Montserrat-Regular]'>{val}</Text>
                             </View> 
                            </TouchableOpacity>
                    ))
                }
              </View>
        </View> */}
        <View className='border-b border-gray-300'>
        </View>
  </View>
  )
}

export default LeadDetails