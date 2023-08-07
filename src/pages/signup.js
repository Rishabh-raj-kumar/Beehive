/* disable eslint */
import { Link, Navigate, useNavigate } from "react-router-dom";
import React, { useContext, useEffect, useState } from "react";
import {firebase} from '../firebase/firebase';
import { createUserWithEmailAndPassword, getAuth, sendEmailVerification, updateProfile } from "firebase/auth";
import * as ROUTES from "../constants/routes";
import { doesUserExist } from "../services/firebase";
import { addDoc, collection, doc, getFirestore, setDoc } from "firebase/firestore";
import { faker } from '@faker-js/faker'
import { useMediaQuery } from 'react-responsive'

function SignUp() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [fullname, setfullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const inValid = email === "" || password === "";
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 770px)' })


  const handleLogin = async (e) => {
    e.preventDefault();
    const usern = await doesUserExist(username);

    if (!usern.length) {
      try {
        const auth = getAuth();
        const createdUserresult = await createUserWithEmailAndPassword(auth,email,password);

        await updateProfile(createdUserresult.user,{
          displayName : username
        })
        await sendEmailVerification(createdUserresult.user);
        console.log(createdUserresult.user.emailVerified);

        const id = createdUserresult.user.uid;

        const db = getFirestore(firebase);
        const col = collection(db,'users');
        await addDoc(col,{
          userId : id,
          username : username.toLowerCase(),
          fullname,
          image : faker.image.avatar(),
          emailAddress : email.toLowerCase(),
          followers : [],
          following : [id,'jZBVejx2x8OdoLl6SXBjXkXB7KD2'],
          suggestions : [],
          description : '',
          ImportPers : false,
          password : password,
          dateCreated : Date.now()
        })

  
        await setDoc(doc(db,"userChats",id),{})

        navigate(`${ROUTES.WalkThrough}`);

      } catch (error) {
        setEmail("");
        setPassword("");
        setError(error.message);
        alert(error.message);
        console.log(error);
      }
    }else{
      alert("User already exists");
    }
  };

  useEffect(() => {
    document.title = "Login Page";
  }, []);

  return (
    <>
      <div className="container mx-auto max-w-screen-md h-screen flex flex-wrap md:flex-nowrap items-center">
        <div className="w-full md:w-3/5 flex items-center justify-center m-3">
        {!isTabletOrMobile && 
          <img
            src="/images/mobile.svg"
            className=" md:w-3/4 mix-blend-darken animate"
            alt="image"
          />
        }
        </div>
        <div className="flex flex-col justify-center gap-3 w-full md:w-2/5 h-full">
          <img src={'/images/logo_bee2.svg'}/>
          {error && <p>{error}</p>}
          <form
            onSubmit={handleLogin}
            method="POST"
            className="flex flex-col gap-3 m-3"
          >
            <input
              type="text"
              placeholder="username"
              value={username}
              className="p-3 text-lg outline-none border-1 shadow-xl focus:outline-2 focus:outline-slate-950 outline-offset-2 rounded
              focus:backdrop:blur-md delay-100 bg-slate-950 text-yellow-400 ease-in-out"
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="text"
              placeholder="fullname"
              value={fullname}
              className="p-3 text-lg outline-none border-1 shadow-xl focus:outline-2 focus:outline-slate-950 outline-offset-2 rounded
              focus:backdrop:blur-md delay-100 bg-slate-950 text-yellow-400 ease-in-out"
              onChange={(e) => setfullname(e.target.value)}
            />
            <input
              type="email"
              placeholder="Email address"
              value={email}
              className="p-3 text-lg outline-none border-1 shadow-xl focus:outline-2 focus:outline-slate-950 outline-offset-2 rounded
              focus:backdrop:blur-md delay-100 bg-slate-950 text-yellow-400 ease-in-out"
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              className="p-3 text-lg outline-none border-1 shadow-xl focus:outline-2 focus:outline-slate-950 outline-offset-2 rounded
              focus:backdrop:blur-md delay-100 bg-slate-950 text-yellow-400 ease-in-out"
              onChange={(e) => setPassword(e.target.value)}
            />

            <input
              disabled={inValid}
              type="submit"
              className={`cursor-pointer p-3 mt-4 text-lg outline-none border-1 focus:bg-yellow-400 shadow-xl 
              focus:outline-2 focus:outline-yellow-400 ${
                inValid && "opacity-50"
              }`}
            />
          </form>
          <div className="m-2 text-md">
            <p>
              Have an account?
              <Link to="/login" className=" mx-2 text-lg text-blue-500">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default SignUp;
