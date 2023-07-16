import React, { useContext } from "react";
import userContext from "../context/usercontext";
import * as ROUTES from "../constants/routes";
import { Link } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import {firebase} from '../firebase/firebase';

function Header() {
    const auth = getAuth(firebase);
  const {user} = useContext(userContext);

  console.log("user", user);
  return (
    <header className="w-full h-16 bg-slate-200 p-2">
      <div className="flex flex-wrap justify-around items-center">
        <div className="p-1">
          <Link to={ROUTES.DASHBOARD}>
            <img src={"/images/logo.png"} alt="logo"
             className="w-3/4" />
          </Link>
        </div>
        <div className=" flex gap-2">
            { user ? ( 
                <>
            <Link to={ROUTES.DASHBOARD}>
                <li className=" list-none">HOME</li>
            </Link>
            <button
            onClick={() => signOut(auth)}>
                LOGOUT
            </button>
            <Link to={`/p/${user.displayName}`}>
                <li className=" list-none">PROFILE</li>
            </Link>
            </>
            ) : (
                <>
                 <Link to={ROUTES.LOGIN}>
                    <button>Login</button>
                 </Link>
                 <Link to={ROUTES.Signup}>
                    <button>Register</button>
                 </Link>
                </>
            )}
        </div>
      </div>
    </header>
  );
}

export default Header;
