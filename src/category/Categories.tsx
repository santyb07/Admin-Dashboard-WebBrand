import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import CategoryCard from './CategoryCard';

interface categories {
    id?: string;
    created_at:Date,
    name:string,
    images:string,
  }
const Categories = () => {
    const [imageCategories, setImageCategories] = useState<categories[]>([]);
    const [loading,setLoading] = useState(true);

 
    async function deleteAllFilesInBucket(bucketName:string) {
        try {
        //   const bucketRef = storage().ref().child(bucketName);
          const bucketRef = storage().ref().child(`categories/${bucketName}`);

          const files = await bucketRef.listAll();
      
        //   await Promise.all(files.items.map(async (fileRef) => {
        //     await fileRef.delete();
        //   }));
        firestore().collection('imageCategories').where('name', '==',bucketName).get()
        .then(querySnapshot => {
            querySnapshot.forEach(doc => {
                console.log(doc.ref.id)
                // doc.ref.delete().then(() => {
                //   console.log("Document successfully deleted!");
                // }).catch(error => {
                //   console.error("Error removing document: ", error);
                // });
              });
        });
        // console.log(files.items);
        // console.log((await bucketRef.listAll()).items)      
        //   console.log('All files in the bucket have been deleted.');
        } catch (error) {
          console.error('Error deleting files:', error);
        }
      }    
    useEffect(()=>{
        const getAllCategories=async()=>{
            try {
                const snapshot = await firestore().collection('imageCategories').orderBy('created_at', 'desc').get();
                const fetchedCategories: categories[] = snapshot.docs.map(doc => ({
                    id: doc.id,
                    created_at: doc.data().created_at.toDate(),
                    name:doc.data().name,
                    images:doc.data().images[0].url
                    // createdAt: {
                    //   date: `${doc.data().createdAt.getMonth() + 1}/${doc.data().createdAt.getDate()}/${doc.data().createdAt.getFullYear()}`,
                    //   time: `${doc.data().createdAt.getHours()}:${doc.data().createdAt.getMinutes()}:${doc.data().createdAt.getSeconds()}`
                    // }
                    
                  })) ;
                console.log(fetchedCategories)
                setImageCategories(fetchedCategories)
                setLoading(false)
    
              } catch (error) {
                console.error('Error fetching Categories: ', error);
                setLoading(false)                
              }
        }  
        getAllCategories()
    },[])
  return (
    <ScrollView className='flex-1 bg-white'>
    <View className='py-2'>
        {
            loading ?
            <ActivityIndicator size="large" />:
            <View className='px-3'>
            {
              imageCategories.map((val,index)=>(
                  <CategoryCard key={index} categoryName={val.name} logo={val.images} created_at={val.created_at.toString()} deleteAllFilesInBucket={deleteAllFilesInBucket}/>
              ))
            }
            </View>
        }
    </View>
        </ScrollView>
  )
}

export default Categories

const styles = StyleSheet.create({
    card: {
      // maxWidth: 340,
      width:'100%',
      margin: 'auto',
      backgroundColor: '#ffffff',
      borderRadius: 12,
      overflow: 'hidden',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 6,
      elevation: 5,
      marginTop:9
    },
    cardImage: {
      width: '100%',
      height: 160, // You can adjust the height as needed
      resizeMode: 'cover',
    },
    cardContent: {
      padding: 12,
    },
    cardTitle: {
      fontWeight: 'bold',
      fontSize: 18,
      marginBottom: 8,
    },
    cardText: {
      color: '#555555',
      fontSize: 14,
      lineHeight: 20,
    },
    tag: {
      backgroundColor: '#e2e8f0',
      color: '#4a5568',
      paddingVertical: 4,
      paddingHorizontal: 8,
      marginRight: 8,
      borderRadius: 9999,
      fontSize: 14,
      fontWeight: 'bold',
    },
  });
  