import React, { useEffect, useRef, useState } from 'react'
import { Alert, Animated, FlatList, Image, ScrollView, Text, TextInput, TextInputComponent, TextInputProps, TouchableOpacity, View } from 'react-native'
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome"
import { showMessage } from 'react-native-flash-message'
import { Button, Chip, Input } from '@rneui/themed'
import firestore from "@react-native-firebase/firestore"
import * as yup from 'yup';
import { Formik, FormikProps } from 'formik';
import * as ImagePicker from 'react-native-image-picker';
// import Animated, { useSharedValue, withTiming } from 'react-native-reanimated'
import storage from '@react-native-firebase/storage';
import { getImageUrls, uploadImages as UploadToFirestore } from './utils/FIreStoreUpload'




const validationSchema = yup.object().shape({
  category: yup.string().max(20,'max 20 letters allowed').required('Category is required'),
  tags: yup.array().min(1).required("at least one tag needs to be here"),
  // images:yup.array().min(1).required('at least one tag needs to be here')
  images: yup.array().of(
    yup.object().shape({
      url: yup.string().required(),
      // Add more validation rules for other properties as needed
    })).min(1).required('at least one tag needs to be here')
 
});
interface MyObject {
    url: string;
  }
  interface ImageAsset {
    uri: string;
    // other properties as needed
  }

const UploadImages = () => {
    const [loading,setLoading] = useState(false);
    const [tags,setTags] = useState<string[]>([]);
    const [tag,setTag] = useState<string>('');
    const [urls, setUrls] = useState<MyObject[]>([]);

  const addTags=(setFieldValue:any)=>{
    if (tag.trim() !== '') {
      // Split input by comma and trim whitespace from each tag
      const newTags = tag.split(',').map(tag => tag.trim());
      // Filter out empty strings
      const filteredTags = newTags.filter(tag => tag !== '');
      // Concatenate new tags with existing tags
      setTags([...tags, ...filteredTags]);
      setFieldValue('tags',[...tags, ...filteredTags]);
      setTag('');
    }
  }
  const handleRemoveTag = (index:number,setFieldValue:any) => {
    const updatedTags = [...tags];
    updatedTags.splice(index, 1);
    setTags(updatedTags);
    setFieldValue('tags',updatedTags)

  };

  const selectImages=async(setFieldValue:any)=>{
    await ImagePicker.launchImageLibrary({
        mediaType: 'photo',
        includeBase64: false,
        selectionLimit:0,
        quality: 1,
      },
      (response) => {
        console.log(response.assets);
        if (response.assets) {
            const newUrls: MyObject[] = response.assets
              .filter((asset): asset is ImageAsset => !!asset.uri) // Type guard to filter out undefined URIs
              .map((asset) => ({ url: asset.uri }));
    
            setUrls((prevUrls) => [...prevUrls, ...newUrls]);
            setFieldValue('images', [...urls, ...newUrls]);
          }
      },
    )
  }

  const handleUpload = async (val:any, { resetForm }:any) => {
    try {
    setLoading(true);
    console.log('handle upload working')
    
    const data= {
      category:val.category,
      tags:val.tags,
      images:[] as MyObject[],
    }
    console.log(data);
      const uploadResults = await UploadToFirestore(val.images,data.category);
      const downloadUrls = await getImageUrls(uploadResults);
      // await storeImageUrlsInFirestore(downloadUrls);
      console.log(downloadUrls)
      if (Array.isArray(downloadUrls) && downloadUrls.length > 0) {
        downloadUrls.forEach((value, index) => {
          data.images.push({ url: value });
        });
        console.log(data);

        const res =await firestore()
        .collection('imageCategories')
        .add({
          created_at:firestore.FieldValue.serverTimestamp(),
          images:data.images,
          tags:data.tags,
          name:data.category
        });

      } else {
        console.log("No download URLs available or downloadUrls is not an array.");
      }
      
      setTags([])
      resetForm();
      Alert.alert('Success', 'Images uploaded successfully.');
      setUrls([]); // Clear selected images after upload
      setLoading(false);
    } catch (error) {
      console.error('Error uploading images:', error);
      Alert.alert('Error', 'Failed to upload images.');
      setLoading(false);
    }
  };
  const deleteImages=(setFieldValue:any)=>{
    console.log('calling delete images')
    setUrls([])
    setFieldValue('images',[])
  }
  const handleDeleteImage=(index:any,setFieldValue:any)=>{
    const updatedUrls= [...urls];
    updatedUrls.splice(index,1);
    setUrls(updatedUrls);
    setFieldValue('images',updatedUrls);
    console.log('handle delete image')
  }
  const enableDeleteImages= urls.length>0;

  const clearTags=(setFieldValue:any)=>{
    setTags([])
    setFieldValue('tags',[])
  }

  return (
    <ScrollView className='flex-1 bg-white'>
      <View className='px-4 py-2'>
        <Formik
        initialValues={{
          category:"",
          tags:[],
          images:[],
        }}
        validationSchema={validationSchema}
        onSubmit={handleUpload}
        >
          {({ handleChange,setFieldValue, handleBlur, handleSubmit, values, errors }: FormikProps<any>): React.ReactNode => (
          <View>
            <ScrollView className='w-full h-36 border px-2 rounded-xl border-gray-300'>
              <View className='flex-row gap-x-4 gap-y-2 flex-wrap justify-start items-center px-2 py-2'>
                {
                urls.map((val,index)=>(
                <View key={index} className='relative'>
                  <Image source={{uri:val.url}} height={80} width={80} resizeMode="cover" className='rounded-xl'/> 
                  <TouchableOpacity className='absolute top-0 right-0  px-2 bg-orange-300 bg-opacity-75 rounded-full justify-center items-center' onPress={()=>handleDeleteImage(index,setFieldValue)}>
                    <Text className='text-white text-xl'>x</Text>
                    </TouchableOpacity>
                    </View>
                    ))
                    }
                    </View>
              </ScrollView> 
              <View>
                <Text className='text-red-400'>{(errors.images && typeof errors.images === 'string') ? errors.images:''}</Text>
              </View>
           <View className='w-full flex-row justify-center items-center space-x-4'>
            {
            enableDeleteImages ?
            <TouchableOpacity className='px-4 py-2 border-2 rounded-xl h-10 justify-center items-center border-gray-500' onPress={()=>deleteImages(setFieldValue)}>
              <Text  className='text-sm font-[Montserrat-Regular]'>Delete Images</Text>
              </TouchableOpacity>:
              <TouchableOpacity className='px-4 py-2 border-2 border-gray-300 rounded-xl h-10 justify-center items-center'>
                <Text className='text-sm text-gray-400 font-[Montserrat-Regular]'>Delete Images</Text>
                </TouchableOpacity>
            }
            <TouchableOpacity className='px-4 py-2 border-2 rounded-xl h-10 justify-center items-center border-gray-500' onPress={()=>selectImages(setFieldValue)}>
              <Text className='text-sm font-[Montserrat-Regular]'>Select Images</Text>
              </TouchableOpacity>
              </View>
              <View className='px-2 py-4'>
<Input
placeholder='Category'
value={values.category}
onChangeText={handleChange('category')}
errorMessage={(errors.category && typeof errors.category === 'string') ? errors.category:''}
maxLength={20}
inputContainerStyle={{
 borderBottomWidth:2,
 borderWidth:2,
 justifyContent:'center',
 alignItems:'center',
 paddingHorizontal:20,
 paddingVertical:2,
 borderRadius:10,
 marginBottom:0,
 // borderColor:colors.ActiveColor
}}
inputStyle={{
 fontSize:16            
}}
containerStyle={{
paddingHorizontal:0,
paddingBottom:0
}}
underlineColorAndroid='transparent'        
/>
<Input
placeholder='add Tags'
value={tag}
onChangeText={(val)=>setTag(val)}
errorMessage={(errors.tags && typeof errors.tags === 'string') ? errors.tags:''}
// errorMessage={tagError ? 'atleast one tag is required':''}
maxLength={100}
multiline={true}
inputContainerStyle={{
   borderBottomWidth:2,
   borderWidth:2,
   justifyContent:'center',
   alignItems:'center',
   paddingHorizontal:5,
   paddingVertical:2,
   borderRadius:10,
   marginBottom:0,
   width:'100%',
 //   backgroundColor:'black'
 // borderColor:colors.ActiveColor
}}
inputStyle={{
   fontSize:16            
 }}
 containerStyle={{
     paddingHorizontal:0,
     paddingBottom:0
 }}
 underlineColorAndroid='transparent'        
 />
 <View className='flex-row justify-end items-center space-x-4 '>
 <View className='mb-6'>
<Button buttonStyle={{borderRadius:20}} titleStyle={{fontFamily:'Montserrat-Regular'}} containerStyle={{width: 100}} onPress={()=>clearTags(setFieldValue)}>Clear</Button>
 </View>
 <View className='mb-6 font-[Montserrat-SemiBold]'>
 <Button buttonStyle={{borderRadius:20}} titleStyle={{fontFamily:'Montserrat-Regular'}}   containerStyle={{width: 100}} onPress={()=>addTags(setFieldValue)}>Add</Button>
 </View>
</View>
<ScrollView className='w-full h-24 border px-2 rounded-xl border-gray-300'>

<View className=' flex-row flex-wrap gap-y-3 py-2 justify-center items-center'>     
{
tags.length==0 ? <Text className='font-[Montserrat-SemiBold] text-gray-500'>No tags given</Text>:
<>
 {tags.map((tag, index) => (
   <View
   key={index}
   className='pl-2 py-1 bg-white rounded-full mr-2 flex-row space-x-2 border border-blue-400 justify-center items-center'
   >
     <Text className='text-blue-600 font-[Montserrat-Medium]'>{tag}</Text>
     <TouchableOpacity className=' bg-white rounded-xl justify-center items-center'>
       <Text className='font-[Montserrat-Bold] text-white bg-blue-400 rounded-full px-2 py-0.5' onPress={() => handleRemoveTag(index,setFieldValue)}>x</Text>
     </TouchableOpacity>
   </View>
 ))}
 </>

 }
</View>
 </ScrollView>
</View>
{
loading ? 
<View className='w-full justify-center items-center py-8'>
<Button
title="Upload"
loading={true}
disabled
loadingProps={{
 size: 'large',
 color: 'rgb(255, 255, 255)',
}}
titleStyle={{ fontFamily:'Montserrat-SemiBold',fontSize:20 }}
buttonStyle={{
 backgroundColor: 'rgb(59,130,246)',
 width:'100%',
 borderColor: 'transparent',
 borderWidth: 0,
 borderRadius:20,
 // paddingVertical: 10,
}}
containerStyle={{
 width: '100%',
}}
/>
</View>:
<View className='w-full justify-center items-center py-8'>
<Button
title="Upload"
//  loading={true}
onPress={()=>handleSubmit()}
loadingProps={{
size: 'large',
color: 'rgba(111, 202, 186, 1)',
}}
titleStyle={{ fontFamily:'Montserrat-SemiBold',fontSize:20 }}
buttonStyle={{
//  backgroundColor: 'rgb(59,130,246)',
//   backgroundColor:colors.ActiveColor,
width:'100%',
borderColor: 'transparent',
borderWidth: 0,
borderRadius: 30,
paddingVertical: 14,
}}
containerStyle={{
width: '100%',
}}
/>
</View>
}
  
          </View>
              )}
      </Formik>
      </View>
    </ScrollView>
  )
}

export default UploadImages

