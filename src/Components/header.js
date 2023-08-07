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
              <Link to={ROUTES.DASHBOARD}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-8 h-8"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                  />
                </svg>
              </Link>
              <Link to={ROUTES.AddPost}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-8 h-8"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </Link>
              <Link to={ROUTES.status}>
                <img
                  width="32"
                  height="32"
                  src="https://img.icons8.com/stickers/100/plus-key.png"
                  alt="plus-key"
                />
              </Link>
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
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-8 h-8 cursor-pointer"
                onClick={() => signOut(auth)}
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
                />
              </svg>
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
