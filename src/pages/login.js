/* disable eslint */
import {Navigate} from 'react-router-dom';
import React, { useContext, useEffect, useState } from 'react'
import Firebasecontext from '../context/firebase';

function Login() {
  const firebase = useContext(Firebasecontext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const inValid = email === '' || password === '';

  const handleLogin = () => {};

  useEffect(() =>{
    document.title = 'Login Page';
  },[])

  return (
    <>
    <div className='w-screen h-screen grid place-items-center'>
      <div className='flex gap-3 flex-wrap'>
      <div>
         <h1>Instagram</h1>
      </div>
      <div className='flex flex-col gap-3'>
        <h1 className='text-4xl font-medium capitalize'>Instagram</h1>
        {error && <p>{error}</p>}
        <form onSubmit={handleLogin} method='POST'
        className='flex flex-col gap-3'>
          <input type="email"
          placeholder='Email address'
          className='p-3 text-lg outline-none border-1 shadow-xl'
          onChange={(e) => console.log(e.target.value)}/>

          <input type="password"
          placeholder='Password'
          className='p-3 text-lg outline-none border-1 shadow-xl'
          onChange={(e) => console.log(e.target.value)}/>
        </form>
      </div>
      </div>
    </div>
    </>
  )
}

export default Login