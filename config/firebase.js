import { initializeApp } from 'firebase/app';
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from 'firebase/storage';

import {
  doc,
  where,
  setDoc,
  getDoc,
  getDocs,
  Timestamp,
  updateDoc,
  deleteDoc,
  collection,
  DocumentData,
  getFirestore,
  addDoc,
} from 'firebase/firestore';

import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();
const storage = getStorage();

/*
{
  "name": "Cool T-Shirt",
  "price": 19.99,
  "description": "Super awesome shirt!",
  "imageUrl": "https:
  "images": ["https:
  "style": "shirt",
  "variants": [
    { "color": "red", "sizes": { "S": 10, "M": 5, "L": 2 }},
    { "color": "blue", "sizes": { "S": 3, "XL": 8 }} 
  ]
}
*/

export async function uploadProductImages(imageFiles) {
  try {
    const imageUrls = [];

    for (const imageFile of imageFiles) {
      const imageName = generateImageName(imageFile);
      const imageRef = ref(storage, `product_images/${imageName}`);
      const uploadTask = uploadBytesResumable(imageRef, imageFile);
      await uploadTask;
      const downloadURL = await getDownloadURL(imageRef);
      imageUrls.push(downloadURL);
    }
    console.log(imageUrls);
    return imageUrls;
  } catch (error) {
    console.error('Error uploading images:', error);
    throw error;
  }
}

function generateImageName(imageFile) {
  return `${Date.now()}_${imageFile.name}`;
}

export async function addProduct(productData) {
  try {
    const docRef = await addDoc(collection(db, 'products'), productData);
    console.log('Product added with ID: ', docRef.id);
  } catch (error) {
    console.error('Error adding product:', error);
  }
}

export async function updateProductInventory(
  productId,
  color,
  size,
  newQuantity,
) {
  try {
    const productRef = doc(db, 'products', productId);
    const productSnapshot = await getDoc(productRef);

    if (!productSnapshot.exists()) {
      console.log(`Product with ID ${productId} not found`);
      return false;
    }

    const variants = productSnapshot.data().variants;
    const variantIndex = variants.findIndex((v) => v.color === color);

    if (variantIndex !== -1) {
      variants[variantIndex].sizes[size] = newQuantity;
      await updateDoc(productRef, { variants: variants });
      return true;
    } else {
      console.log(`Color ${color} not found in product`);
      return false;
    }
  } catch (error) {
    console.error('Error updating inventory:', error);
    throw error;
  }
}

export async function getProductById(productId) {
  try {
    const productRef = doc(db, 'products', productId);
    const productSnapshot = await getDoc(productRef);

    if (!productSnapshot.exists()) {
      console.log(`Product with ID ${productId} not found`);
      return null;
    }
    return { id: productSnapshot.id, ...productSnapshot.data() };
  } catch (error) {
    console.error('Error fetching product:', error);
    throw error;
  }
}

export async function createUserDocument(additionalData) {
  try {
    if (!auth.currentUser) {
      throw new Error('No authenticated user found');
    }

    const userRef = doc(db, 'users', auth.currentUser.uid);

    if (
      typeof additionalData.name !== 'string' ||
      additionalData.name.trim() === ''
    ) {
      throw new Error('Invalid name format');
    }

    const userData = {
      name: additionalData.name.trim(),
      email: auth.currentUser.email,
    };

    await setDoc(userRef, userData);
    console.log('User document successfully created!');
  } catch (error) {
    console.error('Error creating user document:', error);
    throw error;
  }
}

export async function getAllProducts() {
  try {
    const productsRef = collection(db, 'products');
    const productsSnapshot = await getDocs(productsRef);

    const products = productsSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return products;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
}

async function deleteProduct(productId) {
  try {
    const productRef = doc(db, 'products', productId);

    const productSnapshot = await getDoc(productRef);
    if (productSnapshot.exists() && productSnapshot.data().imageUrls) {
      const imageUrls = productSnapshot.data().imageUrls;
      for (const imageUrl of imageUrls) {
        const imageRef = ref(storage);
        await deleteObject(imageRef);
      }
    }

    await deleteDoc(productRef);
    console.log('Product ', productId, ' deleted successfully');
  } catch (error) {
    console.error('Error deleting product:', error);
    throw error;
  }
}
