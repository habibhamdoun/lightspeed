import React, { useState } from 'react';
import firebase from 'firebase/app';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const allowedEmail = "specific_user@example.com"; // Only this user can login

    const handleLogin = async () => {
        try {
            const userCredential = await firebase.auth().signInWithEmailAndPassword(email, password);
            const user = userCredential.user;

            if (user.email === allowedEmail) {
                window.location.href = '/home'; // Redirect to home page
            } else {
            
                firebase.auth().signOut();
                alert("Access denied. You are not the authorized user.");
            }
        } catch (error) {
            console.error(error.message);
            alert("Login failed: " + error.message);
        }
    };

    return (
        <div>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Enter email" />
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Enter password" />
            <button onClick={handleLogin}>Login</button>
        </div>
    );
}

export default Login;
