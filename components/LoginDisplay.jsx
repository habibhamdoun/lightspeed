import React, { useEffect, useState } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
  signInWithPopup,
  fetchSignInMethodsForEmail,
  onAuthStateChanged,
} from 'firebase/auth';
import { auth, googleProvider } from '../config/firebase';
import { useRouter } from 'next/navigation';
import LogoutBtn from './LogoutBtn';
import CompleteModal from './CompleteModal';
import IsloggedIn from './IsloggedIn';

const LoginDisplay = () => {
  let user = auth.currentUser;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [userData, setUserData] = useState(user);
  const [complete, setComplete] = useState(false);
  const router = useRouter();

  const checkEmailExists = async (email) => {
    try {
      const signInMethods = await fetchSignInMethodsForEmail(auth, email);
      console.log('signInMethods: ' + signInMethods);
      return true;
    } catch (err) {
      console.error('Failed to check if email exists:', err.message);
      setError(err.message);
      return false;
    }
  };

  const signIn = async (e) => {
    e.preventDefault();
    setError('');
    if (userData != null) {
      setError(
        `You are already Logged In to ${userData.email} log out before logging in.`,
      );
      return;
    }
    const emailExists = await checkEmailExists(email);
    if (!emailExists) {
      setError('Email not found. Please create an account before logging in.');
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password,
      );
      if (userCredential.user.emailVerified) {
        console.log('Email is verified');
        setUserData(auth.currentUser);
        setComplete(true);
        setTimeout(() => router.push('/home'), 3000);
      } else {
        setError(
          'Your email is not verified. Please check your inbox or spam folder for the verification email.',
        );
        await sendEmailVerification(userCredential.user);
      }
    } catch (err) {
      console.error('Login error:', err);
      if (err.code === 'auth/wrong-password') {
        setError('Incorrect password, please try again.');
      } else {
        setError(err.message);
      }
    }
  };

  const signInWithGoogle = async (e) => {
    e.preventDefault();
    try {
      const result = await signInWithPopup(auth, googleProvider);
      if (result.user.emailVerified) {
        console.log('Logged in with Google:', result.user);
        router.push('/home');
      } else {
        console.error('Please verify your email first.');
        setError(
          'Please verify your email first. Check your inbox or spam folder.',
        );
        await sendEmailVerification(result.user);
      }
    } catch (err) {
      console.error('Google sign-in error:', err);
      setError(err.message);
    }
  };

  const toggleOpen = () => {
    setComplete((prev) => !prev);
  };
  return (
    <div>
      <IsloggedIn />
      {complete && (
        <CompleteModal toggleOpen={toggleOpen} text={'login completed'} />
      )}
      <section className='container mx-auto px-4 my-36'>
        <h1 className='text-2xl font-bold mb-4 text-black text-center'>
          Login
        </h1>
        <p
          className={`text-red-500 text-center ${
            error ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {error}
        </p>
        <form onSubmit={signIn} className='mb-4'>
          <div className='flex flex-col w-full items-center justify-center'>
            <div className='mb-4'>
              <label
                htmlFor='email'
                className='block text-sm font-medium text-gray-700'
              >
                Email:
              </label>
              <input
                type='email'
                id='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className='mt-1 block w-[50vw] md:w-[30vw]  p-2 border border-gray-300 rounded-md shadow-sm'
                required
              />
            </div>
            <div className='mb-4'>
              <label
                htmlFor='name'
                className='block text-sm font-medium text-gray-700'
              >
                Password:
              </label>
              <input
                type='password'
                id='name'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className='mt-1 block w-[50vw] md:w-[30vw] p-2 border border-gray-300 rounded-md shadow-sm'
                required
              />
            </div>
            <div className='text-black'>
              Don't have an account?{' '}
              <a href='/create-account' className='text-[#0000EE] underline'>
                Create account
              </a>
            </div>
            <button
              onClick={signIn}
              type='button'
              className=' bg-main text-black py-2 px-4 rounded text-xl font-semibold mt-2'
            >
              Submit
            </button>
            <p className='text-black font-bold text-center my-5'>Or</p>
            <div className='px-6 sm:px-0 max-w-sm'>
              <button
                type='submit'
                onClick={signInWithGoogle}
                class='text-white w-full  bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center justify-between mr-2 mb-2'
              >
                <svg
                  class='mr-2 -ml-1 w-4 h-4'
                  aria-hidden='true'
                  focusable='false'
                  data-prefix='fab'
                  data-icon='google'
                  role='img'
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 488 512'
                >
                  <path
                    fill='currentColor'
                    d='M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z'
                  ></path>
                </svg>
                Sign in with Google
              </button>
            </div>
            <LogoutBtn />
          </div>
        </form>
      </section>
    </div>
  );
};

export default LoginDisplay;
