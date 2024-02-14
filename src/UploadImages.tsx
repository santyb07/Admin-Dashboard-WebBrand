import React, { useEffect, useRef, useState } from 'react'
import { FlatList, Image, ScrollView, Text, TextInput, TextInputComponent, TextInputProps, TouchableOpacity, View } from 'react-native'
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome"
import { showMessage } from 'react-native-flash-message'
import { Button, Chip, Input } from '@rneui/themed'
import firestore from "@react-native-firebase/firestore"
import * as yup from 'yup';
import { Formik, FormikProps } from 'formik';
import { launchImageLibrary } from 'react-native-image-picker'
import * as ImagePicker from 'react-native-image-picker';



const validationSchema = yup.object().shape({
  category: yup.string().max(20,'max 20 letters allowed').required('Category is required'),
  tags: yup.array().min(1). required("at least one tag needs to be here")
 
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

  const handleSubmit=()=>{

  }
  const addTags=()=>{
    setTags([...tags,tag]);
    setTag('');
  }
  const selectImages=async()=>{
    ImagePicker.launchImageLibrary({
        mediaType: 'photo',
        includeBase64: false,
        selectionLimit:0,
      },
      (response) => {
        console.log(response.assets);
        if (response.assets) {
            const newUrls: MyObject[] = response.assets
              .filter((asset): asset is ImageAsset => !!asset.uri) // Type guard to filter out undefined URIs
              .map((asset) => ({ url: asset.uri }));
    
            setUrls((prevUrls) => [...prevUrls, ...newUrls]);
          }
      },
    )
  }
  const deleteImages=()=>{
    setUrls([])
  }

  return (
        <ScrollView className='flex-1 bg-white'>
           {/* <View className='py-2 bg-orange-400'>
    <Text className='text-2xl text-center text-white'>Upload Images</Text>
        </View> */}
    <View className='flex-1 px-4'>
      
        <View className='pt-8 px-2'>
            <View className='flex-row gap-x-4 gap-y-2 flex-wrap justify-center items-center'>
                {
                    urls.map((val,index)=>(
                        <Image source={{uri:val.url}} key={index} height={100} width={100}/> 
                    ))
                }
            </View>
            {/* <View className='flex-row  items-center justify-center '> */}
          <View className='w-full flex-row justify-center items-center space-x-4'>
                <TouchableOpacity className='px-4 py-2 border-2 rounded-xl h-10 justify-center items-center'>
                <Text onPress={deleteImages} className='text-sm'>Delete Images</Text>
                </TouchableOpacity>
                <TouchableOpacity className='px-4 py-2 border-2 rounded-xl h-10 justify-center items-center'>
                <Text onPress={selectImages} className='text-sm'>Select Images</Text>
                </TouchableOpacity>
            </View>
        </View>
      <View className='flex-col mt-10'>
        {/* <Text className='text-lg mb-3 text-center'>
            Details
        </Text> */}
         <Formik
      initialValues={{
        category:"",
        tags:[]
      }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ handleChange, handleBlur, handleSubmit, values, errors }: FormikProps<any>): React.ReactNode => (
          <View>
            <View className='px-2'>
         
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
        {/* <View className='flex-row justify-between items-center '> */}
        {/* <View> */}
         <Input
        placeholder='add Tags'
        value={tag}
        onChangeText={(val)=>setTag(val)}
        // errorMessage={(errors.category && typeof errors.category === 'string') ? errors.category:''}
        maxLength={30}
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
            <View className='flex-row justify-center items-center space-x-7 '>
            <View className='mb-6'>
        <Button buttonStyle={{borderRadius:20}}   containerStyle={{width: 100}} onPress={()=>setTags([])}>delete</Button>
            </View>
            <View className='mb-6'>
            <Button buttonStyle={{borderRadius:20}}   containerStyle={{width: 100}} onPress={()=>addTags()}>Add</Button>

            </View>
        </View>
        <View className='flex-row items-center justify-start flex-wrap space-x-4'>
                {
                    tags.map((val,index)=>(
                        <Chip
                        key={index}
                        title={val}
                        type="outline"
                        containerStyle={{ marginVertical: 15,marginRight:10 }}
                      />
                    ))
                }
              </View>
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
    </View>
    </ScrollView>
  )
}

export default UploadImages