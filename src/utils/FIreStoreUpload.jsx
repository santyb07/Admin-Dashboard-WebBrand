import { firebase } from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';

// Function to upload images to Firebase Storage
export const uploadImages = async (images,category) => {
  const uploadTasks = images.map(async (image, index) => {
    // const response = await fetch(image.uri);
    // const blob = await image.blob();
    const storageRef = firebase.storage().ref().child(`categories/${category}/image${index}`);
    await storageRef.putFile(image.url);
    console.log('image uploading successfully')
    return storageRef;
  });
  return Promise.all(uploadTasks);
};

// Function to get download URLs of uploaded images
export const getImageUrls = async (imageRefs) => {
  const downloadUrls = await Promise.all(imageRefs.map((imageRef) => imageRef.getDownloadURL()));
  return downloadUrls;
};

// Function to store image URLs in Firestore
export const storeImageUrlsInFirestore = async (imageUrls) => {
  const batch = firestore().batch();
  const collectionRef = firestore().collection('images');
  imageUrls.forEach((imageUrl) => {
    const docRef = collectionRef.doc();
    batch.set(docRef, { imageUrl });
  });
  await batch.commit();
};