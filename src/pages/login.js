/* disable eslint */
import { Link, Route, useNavigate } from "react-router-dom";
import React, { useContext, useEffect, useState } from "react";
import Firebasecontext from "../context/firebase";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import * as ROUTES from "../constants/routes";
import { useMediaQuery } from "react-responsive";

function Login() {
  const navigate = useNavigate();
  const firebase = useContext(Firebasecontext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const inValid = email === "" || password === "";
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 770px)" });
  const [user,setUser] = useState('');

  useEffect(() =>{
     const data = JSON.parse(localStorage.getItem("authUser"));
     setUser(data);
  })

  useEffect(() => {
    // console.log(user)
    try {
      if (user.uid.length > 0) {
        navigate(`${ROUTES.DASHBOARD}`);
      }
    } catch (err) {
      navigate(`${ROUTES.LOGIN}`);
    }
  }, [user]);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const auth = getAuth();
      const resp = await signInWithEmailAndPassword(auth, email, password);
      if (resp) {
        alert("Logined success");
        navigate(`${ROUTES.DASHBOARD}`);
      }
    } catch (error) {
      setEmail("");
      setPassword("");
      setError(error.message);
      console.log(error);
    }
  };

  useEffect(() => {
    document.title = "Login Page";
  }, []);

  return (
    <>
      <div className=" container mx-auto max-w-screen-md h-screen flex flex-wrap md:flex-nowrap items-center">
        <div className="w-full md:w-3/5 flex items-center justify-center m-3">
          {!isTabletOrMobile && (
            <img
              src="/images/mobile.svg"
              className=" md:w-3/4 mix-blend-darken animate"
              alt="image"
            />
          )}
        </div>
        <div className="flex flex-col justify-center gap-3 w-full md:w-2/5 h-full">
          <img src={"/images/logo_bee2.svg"} />
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
              className={` bg-emerald-400 cursor-pointer p-3 mt-4 text-lg outline-none border-1 focus:bg-yellow-400 shadow-xl 
              focus:outline-2 focus:outline-yellow-400 ${
                inValid && "opacity-50"
              }`}
            />
          </form>
          <div className="m-2 text-md">
            <p>
              Dont have an account?
              <Link to="/signup" className=" mx-2 text-lg text-blue-500">
                SignUp
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
