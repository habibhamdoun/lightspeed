'use client';
import React, { useState } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  sendEmailVerification,
  fetchSignInMethodsForEmail,
} from 'firebase/auth';
import { auth, googleProvider } from '../config/firebase';
import VerifyEmail from './VerifyEmail';
import { useRouter } from 'next/navigation';
import IsloggedIn from './IsloggedIn';

const CreateAccountDisplay = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [showPassword, setShowPassword] = useState('');
  const router = useRouter();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const checkIfEmailExists = async (email) => {
    try {
      const signInMethods = await fetchSignInMethodsForEmail(auth, email);
      console.log('signInMethods: ' + signInMethods);
      return signInMethods.length > 0;
    } catch (err) {
      console.error('Failed to check if email exists:', err.message);
      setError(err.message);
      return false;
    }
  };

  const checkEmailVerification = async () => {
    try {
      const user = auth.currentUser;
      await user.reload();
      console.log('user.emailVerified: ' + user.emailVerified);
      if (user.emailVerified) {
        router.push('/home');
      } else {
        setError('Your email has not been verified. Please check your inbox.');
        console.log('email not verified');
      }
    } catch (error) {
      console.error('Verification check failed:', error);
      setErrorMessage('Failed to verify email. Please try again.');
    }
  };

  const handleCreateAccount = async (e) => {
    e.preventDefault();
    const emailExists = await checkIfEmailExists(email);
    if (emailExists) {
      setError('The email address is already in use by another account.');
      return;
    }
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      await sendEmailVerification(userCredential.user);
      checkEmailVerification();
      console.log('Verification email sent.');
    } catch (err) {
      console.error('Error:', err.message);
      setError(err.message);
      return;
    }
    setIsEmailVerified(true);
  };

  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      setIsEmailVerified(true);
      await sendEmailVerification(result.user);
      setError('Please verify your email first.');
    } catch (err) {
      console.error('Error:', err.message);
      setError(err.message);
    }
  };

  return (
    <div>
      <IsloggedIn />
      <section className='container mx-auto px-4 my-36'>
        {!isEmailVerified ? (
          <div>
            <h1 className='text-2xl font-bold mb-4 text-black text-center'>
              Create Account
            </h1>
            <form onSubmit={handleCreateAccount} className='mb-4'>
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
                    className='mt-1 block w-[50vw] md:w-[30vw] text-black p-2 border border-gray-300 rounded-md shadow-sm'
                    required
                  />
                </div>
                <div className='mb-4'>
                  <label
                    htmlFor='password'
                    className='block text-sm font-medium text-gray-700'
                  >
                    Password:
                  </label>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id='password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className='mt-1 block w-[50vw] md:w-[30vw] p-2 border border-gray-300 rounded-md shadow-sm'
                    required
                  />
                  <button
                    onClick={togglePasswordVisibility}
                    className='mt-1 text-sm text-gray-600 hover:text-black'
                  >
                    {showPassword ? 'Hide' : 'Show'} Password
                  </button>
                </div>
                <div className='text-black'>
                  Already have an account?{' '}
                  <a href='/login' className='text-[#0000EE] underline'>
                    Login
                  </a>
                </div>
                <button
                  type='button'
                  onClick={handleCreateAccount}
                  className='bg-main text-black py-2 px-4 rounded text-xl font-semibold mt-2'
                >
                  Submit
                </button>
                <p className='text-black font-bold text-center my-5'>Or</p>
                <div className='px-6 sm:px-0 max-w-sm'>
                  <button
                    type='button'
                    onClick={signInWithGoogle}
                    className='text-white w-full bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center justify-between mr-2 mb-2'
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
                    Sign Up with Google
                  </button>
                </div>
              </div>
            </form>
          </div>
        ) : (
          <VerifyEmail
            auth={auth}
            checkEmailVerification={checkEmailVerification}
          />
        )}
        <p
          className={`text-red-500 text-center ${
            error ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {error}
        </p>
      </section>
    </div>
  );
};

export default CreateAccountDisplay;
