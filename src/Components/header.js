import React, { useContext, useEffect, useState } from "react";
import userContext from "../context/usercontext";
import * as ROUTES from "../constants/routes";
import { Link } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import { firebase } from "../firebase/firebase";
import useUser from "../hooks/useuser";
import { useMediaQuery } from "react-responsive";
import Notification from "./sidebar/Notification";

function Header() {
  const isTabletOrMobile = useMediaQuery({ maxWidth: 700 });
  const { user: profile } = useUser();
  const auth = getAuth(firebase);
  const { user } = useContext(userContext);
  const [image, setImage] = useState(null);
  const [name, setName] = useState("");
  const [followedUserImg,setfollowedImg] = useState(null);
  const [notif,setNotif] = useState(1);

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
            <div className=" flex gap-2">
            <img src={"/images/logo_bee2.png"} className=" w-8 h-8 " />
            <p className=" font-poppins text-xl items-center">Beehive</p>
            </div>
          </Link>
        </div>
        <div>
        {isTabletOrMobile &&
        <Link to={ROUTES.Notifier}>
          <div className="relative">
          <svg
            width="40px"
            height="40px"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M10.5 4.68727V3.75H13.5V4.68731C16.1369 5.35963 18.0833 7.76335 18.0833 10.6184V15.3158C18.0833 15.7194 18.2193 16.2984 18.3833 16.8298C18.4618 17.0841 18.5405 17.3084 18.5996 17.4689C18.6291 17.5489 18.6534 17.6125 18.6701 17.6553L18.6891 17.7034L18.6936 17.7147L18.6945 17.717L18 18.75H5.99996L5.30542 17.717L5.30632 17.7147L5.31085 17.7034L5.32979 17.6553C5.3465 17.6125 5.37086 17.5489 5.40032 17.4689C5.45941 17.3084 5.53817 17.0841 5.61665 16.8298C5.78067 16.2984 5.91663 15.7194 5.91663 15.3158V10.6184C5.91663 7.76329 7.8631 5.35953 10.5 4.68727ZM12 6C9.47329 6 7.41663 8.06309 7.41663 10.6184V15.3158C7.41663 15.9518 7.22451 16.7031 7.05676 17.25H16.9432C16.7754 16.7031 16.5833 15.9518 16.5833 15.3158V10.6184C16.5833 8.06309 14.5266 6 12 6ZM15 21H9.00004V19.5H15V21Z"
              fill="#000000"
            />
          </svg>
          {notif > 0 && (
            <p className=" w-4 h-4 absolute text-sm text-center top-0 right-2 bg-red-500 rounded-full">
              {notif}
            </p>
          )}
        </div></Link>}

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
