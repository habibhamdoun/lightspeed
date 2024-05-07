'use client'
import React, { useState } from 'react';
import { createUserWithEmailAndPassword, signInWithPopup,  sendEmailVerification,  fetchSignInMethodsForEmail } from 'firebase/auth';
import { auth, googleProvider } from "../config/firebase";
import { useRouter } from 'next/navigation';  

const CreateAccountDisplay = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter(); 

    const checkIfEmailExists = async (email) => {
        try {
            const signInMethods = await fetchSignInMethodsForEmail(auth, email);
            return signInMethods.length > 0;
        } catch (err) {
            console.error("Failed to check if email exists:", err.message);
            setError(err.message);
            return false;
        }
    };

    const handleCreateAccount = async (e) => {
        e.preventDefault();
        setError('');

        const emailExists = await checkIfEmailExists(email);
        if (emailExists) {
            setError("The email address is already in use by another account.");
            return;
        }

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            await sendEmailVerification(userCredential.user);
            setError("Verification email sent. Please verify your email before logging in.");
            console.log("Verification email sent.");
            router.push('/verify-email'); 
        } catch (err) {
            console.error("Error:", err.message);
            setError(err.message);
        }
    };

    const signInWithGoogle = async () => {
        try {
            const result = await signInWithPopup(auth, googleProvider);
            router.push('/verify-email'); 

                await sendEmailVerification(result.user);
                setError("Please verify your email first.");
            
        } catch (err) {
            console.error("Error:", err.message);
            setError(err.message);
        }
    };


    return (
        <section className='container mx-auto px-4 my-36'>
            <h1 className='text-2xl font-bold mb-4 text-black text-center'>Create Account</h1>
            {error && <p className="text-red-500 text-center">{error}</p>}
            <form onSubmit={handleCreateAccount} className='mb-4'>
                <div className='flex flex-col w-full items-center justify-center'>
                    <div className='mb-4'>
                        <label htmlFor='email' className='block text-sm font-medium text-gray-700'>
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
                        <label htmlFor='password' className='block text-sm font-medium text-gray-700'>
                            Password:
                        </label>
                        <input
                            type='password'
                            id='password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className='mt-1 text-black block w-[50vw] md:w-[30vw] p-2 border border-gray-300 rounded-md shadow-sm'
                            required
                        />
                    </div>
                    <div className='text-black'>
                        Already have an account?{' '}
                        <a href='/login' className='text-[#0000EE] underline'>
                            Login
                        </a>
                    </div>
                    <button
                        type='submit'
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
                            Sign Up with Google
                        </button>
                    </div>
                </div>
            </form>
        </section>
    );
};

export default CreateAccountDisplay;
