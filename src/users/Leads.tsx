import { View, Text, ScrollView, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
// import HeaderBar from './components/HeaderBar'
// import Clip from './components/Clip'
import LeadCard from './components/LeadCard'
import firestore from '@react-native-firebase/firestore';
import { colors } from '../utils/Constants';

const clipData=['All','Pending','In-Progress','Followup On Interest','Interested','Done']

interface User {
  id?: string;
  businessName?: string;
  // createdAt: {
  //   date: string;
  //   time: string;
  // }
  createdAt:Date,
  designation?: string;
  email?: string;
  location?: string;
  logo?: string;
  logoMetadata?: any; // You may want to replace 'any' with a specific type for logoMetadata
  mobileNumber1: string;
  mobileNumber2?: string;
  website?: string;
}

const Leads = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading,setLoading] = useState(true);

   useEffect(()=>{
    const fetchUsers = async () => {
      try {
        const snapshot = await firestore().collection('users').orderBy('createdAt', 'desc').get();
        const fetchedUsers: User[] = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          createdAt: doc.data().createdAt.toDate(),
          // createdAt: {
          //   date: `${doc.data().createdAt.getMonth() + 1}/${doc.data().createdAt.getDate()}/${doc.data().createdAt.getFullYear()}`,
          //   time: `${doc.data().createdAt.getHours()}:${doc.data().createdAt.getMinutes()}:${doc.data().createdAt.getSeconds()}`
          // }
          
        })) as User[];
        setUsers(fetchedUsers);
        setLoading(false);
        // console.log(typeof users[0].createdAt)
      } catch (error) {
        console.error('Error fetching users: ', error);
        setLoading(false);
      }
    };

    fetchUsers();
  },[])

  if (loading) {
    return (    
      <View className='flex-1 bg-white pb-16 items-center'> 
      <View className='flex-1 justify-center items-center'>
      <Text>
    <ActivityIndicator size="large" color={colors.ActiveColor} />
      </Text>
      </View>
    </View>
    )
  }
  return (
    <View className='flex-1 bg-white'>
    {/* <HeaderBar name={'Leads'} logo={true} help={false} search={true}/> */}
    {/* <View> */}
    {/* <View className='py-2 bg-orange-400'> */}
    {/* <ScrollView horizontal>
      <View className='flex-row justify-start px-3 py-3'>
      {
        clipData.map((val,key)=>(
          <Clip name={val} key={key}/>
          ))
        }
      </View>
    </ScrollView> */}
    {/* <Text className='text-2xl text-center text-white'>Leads</Text> */}
        {/* </View> */}
    <View className='px-3'>
      {
        users.map((val,index)=>(
          <LeadCard key={index} businessName={val.businessName} mobileNumber={val.mobileNumber1} logo={val.logo} createdAt={val.createdAt.toString()}/>
        ))
      }
      </View>
  </View>
  )
}

export default Leads