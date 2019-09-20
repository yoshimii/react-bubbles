import React, { useState } from 'react';
import { axiosWithAuth } from '../utils/axiosWithAuth';

const LoginForm = (props) => {

const [ creds, setCreds] = useState({ username: '', password: '' })
   

    const handleChange = e => {
        e.preventDefault();
        setCreds({ ...creds,  [e.target.name]: e.target.value });
        console.log(e.target.name)
    }

    const login = e => {
        e.preventDefault();
        axiosWithAuth()
        .post('/login', creds)
        .then(res => {
            localStorage.setItem('token', res.data.payload);
            props.history.push('/bubbles')
            console.log(res)
        })
        .catch(err => {
            console.log('my err', err)
            console.log(creds)
        })

        console.log(creds)
    }

    return (
        <>
        <h1>Welcome to the Bubble App!</h1>
        <form className='bubble-form' onSubmit={login}>
            <input
            type='text'
            value={creds.username}
            placeholder='name'
            onChange={handleChange}
            name='username'
            >
            </input>
            <input
            type='password'
            value={creds.password}
            placeholder='password'
            onChange={handleChange}
            name='password'
            >
            </input>
            <button type='submit'>Log in</button>
        </form>
        </>
    )
}

export default LoginForm;