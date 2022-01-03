import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebaseconfig';
import '../App.css'

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [user, setUser] = useState();
    const [error, setError] = useState();
    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password).then(userCredentials => {
            navigate('/adminpanel');
            setUser(userCredentials.user);
        }).catch((error) => { setError("Failed to log in."); });

        setEmail('');
        setPassword('');
    }

    return (
        <div className="loginContainer">
        <div className='loginForm'>
       
            <form className='form' onSubmit={handleSubmit} >
                <input type='text' placeholder='Enter your username' />
                <input type="email" placeholder='Enter your email' value={email} onChange={(e) => { setEmail(e.target.value) }} required />
                <input type="password" placeholder='Enter password' value={password} onChange={(e) => { setPassword(e.target.value) }} required />
                <button type="submit" className='btn' >Login</button>
            </form>
           
        </div>
          
          
            
        </div>

        
    )
}
