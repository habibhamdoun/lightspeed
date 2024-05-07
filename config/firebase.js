import { initializeApp } from 'firebase/app';
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
  apiKey: 'AIzaSyDy-t-jV9f9___ZSoelrBJu19mwiQ1YvWw',
  authDomain: 'lightspeed-8a77a.firebaseapp.com',
  projectId: 'lightspeed-8a77a',
  storageBucket: 'lightspeed-8a77a.appspot.com',
  messagingSenderId: '545690330915',
  appId: '1:545690330915:web:d35de7b28eeda8210fce96',
  measurementId: 'G-80XTV2HZEN',
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const firestore = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();
