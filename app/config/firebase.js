import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyCKMN807w0EFHKUDWFuh4Z3uJagBJ8Wh24',
  authDomain: 'light-speed-530f0.firebaseapp.com',
  projectId: 'light-speed-530f0',
  storageBucket: 'light-speed-530f0.appspot.com',
  messagingSenderId: '341454923978',
  appId: '1:341454923978:web:a3d19c5a0436c12a6cec33',
  measurementId: 'G-WZ6KPDS55M',
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
