/* disable eslint */
import { Link, Route, useNavigate } from "react-router-dom";
import React, { useContext, useEffect, useState } from "react";
import Firebasecontext from "../context/firebase";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import * as ROUTES from "../constants/routes";
import { useMediaQuery } from "react-responsive";
import Loader from "../Components/Loader";

function Login() {
  const navigate = useNavigate();
  const firebase = useContext(Firebasecontext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const inValid = email === "" || password === "" || password.length < 6;
  const isTabletOrMobile = useMediaQuery({ maxWidth: 770 });

  useEffect(() => {
    // console.log(user)
    const data = JSON.parse(localStorage.getItem("authUser"));
    try {
      if (data) {
        navigate(`${ROUTES.DASHBOARD}`);
      }
    } catch (err) {
      navigate(`${ROUTES.LOGIN}`);
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const auth = getAuth();
      const resp = await signInWithEmailAndPassword(auth, email, password);
      if (resp) {
        setLoading(false);
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
      {loading ? (
        <>
          <Loader />
        </>
      ) : (
        <div
          className=" container overflow-hidden mx-auto max-w-screen-md h-screen flex flex-wrap md:flex-nowrap items-center"
          style={{
            background: `${
              isTabletOrMobile ? "url('/images/background.png')" : "none"
            }`,
            backgroundSize: "100% 100%",
          }}
        >
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
            <div className=" flex gap-1 items-center justify-center">
              <img
                src={"/images/logo_bee2.png"}
                className=" w-36 rounded-full shadow-xl shadow-violet-500"
              />
              <p className=" font-poppins text-4xl font-semibold">Beehive</p>
            </div>
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
                value="Let's Go"
                className={` bg-slate-950 font-poppins cursor-pointer p-3 mt-4 text-lg outline-none border-1 focus:bg-yellow-400 shadow-xl 
              focus:outline-2 focus:outline-yellow-400 ${
                inValid ? "text-gray-200 opacity-80" : "text-white opacity-100"
              }`}
              />
            </form>
            <div className="m-2 text-md">
              <p className=" text-white">
                Dont have an account?
                <Link to="/signup" className=" mx-2 text-lg text-blue-500">
                  SignUp
                </Link>
              </p>
            </div>
            <Link to={ROUTES.forgotPass}>
              <div className=" w-full">
                <p className=" text-lg font-semibold text-center underline">
                  Forgot Password?
                </p>
              </div>
            </Link>
          </div>
        </div>
      )}
    </>
  );
}

export default Login;
