import React, { useContext, useEffect, useState } from "react";
import userContext from "../context/usercontext";
import * as ROUTES from "../constants/routes";
import { Link } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import { firebase } from "../firebase/firebase";
import useUser from "../hooks/useuser";
import { useMediaQuery } from "react-responsive";

function Header() {
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 770px)" });
  const { user: profile } = useUser();
  const auth = getAuth(firebase);
  const { user } = useContext(userContext);
  const [image, setImage] = useState(null);
  const [name, setName] = useState("");
  const [followedUserImg,setfollowedImg] = useState(null);

  useEffect(() => {
    try {
      if (profile) {
        setImage(profile[0].image);
        setName(profile[0].username);
      }
    } catch (err) {
      console.log(err);
    }
  }, [profile]);

  return (
    <header className="header w-full h-16 backdrop-blur p-2 sticky top-0 z-50">
      <div className="flex flex-wrap justify-around items-center">
        <div className="p-1">
          <Link to={ROUTES.DASHBOARD}>
            <img src={"/images/logo_bee2.svg"} />
          </Link>
        </div>
        <div
          className={`${
            isTabletOrMobile && `hidden`
          } flex gap-5 bottom-0 left-0`}
        >
          {user ? (
            <>
              <Link to={ROUTES.Chat}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-8 h-8 -rotate-45 -translate-y-1"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
                  />
                </svg>
              </Link>
              <Link to={`/p/${name}`}>
                <img
                  className=" w-10 h-10 rounded-full object-cover"
                  src={image}
                  alt="profileImage"
                />
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
