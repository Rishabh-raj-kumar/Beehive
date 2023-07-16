/* disable eslint */
import { Link, Navigate } from "react-router-dom";
import React, { useContext, useEffect, useState } from "react";
import Firebasecontext from "../context/firebase";
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import * as ROUTES from '../constants/routes';

function Login() {
  const firebase = useContext(Firebasecontext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const inValid = email === "" || password === "";

  const handleLogin = async(e) => {
    e.preventDefault();

    try {
      const auth = getAuth();
       const resp = await signInWithEmailAndPassword(auth,email,password);
       if(resp){
        alert('Logined success');
        <Navigate to={ROUTES.DASHBOARD}/>
       }
    } catch (error) {
       setEmail('');
       setPassword('');
       setError(error.message);
      console.log(error);
    }
  };

  useEffect(() => {
    document.title = "Login Page";
  }, []);

  return (
    <>
      <div className="container mx-auto max-w-screen-md h-screen flex flex-wrap md:flex-nowrap items-center">
        <div className="w-full md:w-3/5 flex items-center justify-center m-3">
          <img
            src="/images/iphone-with-profile.jpg"
            className=" w-20 md:w-3/4"
            alt="image"
          />
        </div>
        <div className="flex flex-col justify-center gap-3 w-full md:w-2/5 h-full">
          <h1 className="text-4xl font-medium capitalize m-3">Instagram</h1>
          {error && <p>{error}</p>}
          <form
            onSubmit={handleLogin}
            method="POST"
            className="flex flex-col gap-3 m-3"
          >
            <input
              type="email"
              placeholder="Email address"
              value={email}
              className="p-3 text-lg outline-none border-1 shadow-xl focus:outline-2 focus:outline-purple-600 outline-offset-2 rounded
           focus:scale-110 focus:backdrop:blur-md delay-100 focus:shadow-purple-300 focus:bg-purple-800 focus:text-white ease-in-out"
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              className="p-3 text-lg outline-none border-1 shadow-xl focus:outline-2 focus:outline-purple-600 outline-offset-2 rounded
           focus:scale-110 focus:backdrop:blur-md delay-100 focus:shadow-purple-300 focus:bg-purple-800 focus:text-white ease-in-out"
              onChange={(e) => setPassword(e.target.value)}
            />

            <input
            disabled={inValid}
              type="submit"
              className={`cursor-pointer p-3 mt-4 text-lg outline-none border-1 focus:bg-yellow-400 shadow-xl 
              focus:outline-2 focus:outline-yellow-400 ${inValid && 'opacity-50'}`}
            />
          </form>
          <div className="m-2 text-md">
          <p>Dont have an account?
            <Link to="/signup" className=" mx-2 text-lg text-blue-500">SignUp</Link>
          </p>
        </div>
        </div>
      </div>
    </>
  );
}

export default Login;
