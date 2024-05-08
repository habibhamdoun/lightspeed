import { initializeApp } from 'firebase/app';
import { getAnalytics, logEvent } from "firebase/analytics";

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
export const firestore = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();
const analytics = getAnalytics(app);



// Template of product document
/*
{
  "name": "Cool T-Shirt",
  "price": 19.99,
  "description": "Super awesome shirt!",
  "imageUrl": "https://...", 
  "images": ["https://...", "https://..."],
  "style": "shirt",
  "variants": [
    { "color": "red", "sizes": { "S": 10, "M": 5, "L": 2 }},
    { "color": "blue", "sizes": { "S": 3, "XL": 8 }} 
  ]
}
*/

import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase-admin/storage';  

async function uploadProductImages(imageFiles, productId) {
  try {
    const imageUrls = []; 

    for (const imageFile of imageFiles) {
      const imageName = generateImageName(imageFile); // Implement your image naming logic
      const imageRef = ref(storage, `product_images/${productId}/${imageName}`);
      const uploadTask = uploadBytesResumable(imageRef, imageFile);
      await uploadTask;
      const downloadURL = await getDownloadURL(imageRef);
      imageUrls.push(downloadURL);
    }

    return imageUrls;
  } catch (error) {
    console.error("Error uploading images:", error);
    throw error; 
  }
}

// Helper function (optional)
function generateImageName(imageFile) {
  // Example: Use timestamp + original filename 
  return `${Date.now()}_${imageFile.name}`;
}

async function createProduct(productData) {
  try {
    // ---- Validation Checks ----
    if (typeof productData.name !== 'string' || productData.name.length < 6) {
      throw new Error('Product name must be a string with at least 6 characters');
    }
    if (typeof productData.description !== 'string' || productData.description.length < 6) {
      throw new Error('Product description must be a string with at least 6 characters');
    }
    if (typeof productData.price !== 'number' || productData.price <= 0) {
      throw new Error('Product price must be a positive number');
    }
    if (!isURL(productData.imageUrl)) {
      throw new Error('Invalid image URL format');
    }
    if (typeof productData.type !== 'string' || productData.type.length < 6) {
      throw new Error('Product type must be a string with at least 6 characters');
    }

    // Variant & Size Validation
    const allowedSizes = ["XS", "S", "M", "L", "XL"];
    if (!Array.isArray(productData.variants)) {
      throw new Error('Variants must be an array');
    }
    productData.variants.forEach(variant => {
      if (typeof variant.color !== 'string' || !Object.keys(variant.sizes).every(size => allowedSizes.includes(size))) {
         throw new Error('Invalid variant format');
      }
    });

    // ---- Image Upload Logic -----
    const imageUrls = await uploadProductImages(productData.imageFiles, productData.id); 

    // ---- Prepare Final Product Data ----
    const productDataWithImages = { ...productData, imageUrls };

    // ---- Create Firestore Document ----
    const productsRef = collection(db, 'products');
    const docRef = await addDoc(productsRef, productDataWithImages);  
    console.log("Product created with ID: ", docRef.id);
    return docRef.id; 

  } catch (error) {
    console.error("Error creating product:", error);
    throw error; 
  }
}

async function updateProductInventory(productId, color, size, newQuantity) {
  try {
    const productRef = doc(db, 'products', productId);
    const productSnapshot = await getDoc(productRef);

    if (!productSnapshot.exists()) {
      console.log(`Product with ID ${productId} not found`);
      return false; 
    }

    const variants = productSnapshot.data().variants;
    const variantIndex = variants.findIndex(v => v.color === color);

    if (variantIndex !== -1) {
      variants[variantIndex].sizes[size] = newQuantity;
      await updateDoc(productRef, { variants: variants });
      return true;  
    } else {
      console.log(`Color ${color} not found in product`);
      return false;
    }
  } catch (error) {
    console.error("Error updating inventory:", error);
    throw error;  
  }
}

async function getProductById(productId) {
  try {
    const productRef = doc(db, 'products', productId);
    const productSnapshot = await getDoc(productRef);

    if (!productSnapshot.exists()) {
      console.log(`Product with ID ${productId} not found`);
      return null;  
    } 
    return { id: productSnapshot.id, ...productSnapshot.data() };
  } catch (error) {
    console.error("Error fetching product:", error);
    throw error;  
  }
}

async function createUserDocument(additionalData) {
  try {
    if (!auth.currentUser) {
      throw new Error('No authenticated user found');
    }

    const userRef = doc(db, 'users', auth.currentUser.uid);

    // Basic Validation (Adjust as needed)
    if (typeof additionalData.name !== 'string' || additionalData.name.trim() === '') {
      throw new Error('Invalid name format');
    }

    const userData = {
      name: additionalData.name.trim(), 
      email: auth.currentUser.email,
      // ... you might add more fields here
    };

    await setDoc(userRef, userData);
    console.log("User document successfully created!"); 
  } catch (error) {
    console.error("Error creating user document:", error);
    throw error; 
  }
}