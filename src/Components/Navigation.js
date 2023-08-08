import { getAuth, signOut } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { firebase } from "../firebase/firebase";
import * as ROUTES from "../constants/routes";
import { Link } from "react-router-dom";
import useUser from "../hooks/useuser";

function Navigation() {
    const auth = getAuth(firebase);
    const { user: profile } = useUser();
  const [image, setImage] = useState(null);
  const [name, setName] = useState("");
  const [blue,setBlue] = useState(null);

  useEffect(() => {
    try {
      if (profile) {
        setImage(profile[0].image);
        setName(profile[0].username);
        setBlue(profile[0].ImportPers);
      }
    } catch (err) {
    //   console.log(err);
    }
  }, [profile]);

  return (
    <div className="relative col-span-1">
      <div className="max-w-sm w-1/5 h-screen bg-black fixed left-0 top-16
       shadow-gray-50" style={{ boxShadow : '5px 0px 30px 5px rgba(255,255,255,0.3)'}}>
        <div className=" flex flex-col gap-6 items-start mt-6 w-full">
            <div className=" w-full flex items-center px-3">
            <img src={image} alt="profile" className=" w-16 h-16 rounded-full object-cover"/>
            <div className=" flex gap-2 items-center">
               <p className=" text-white font-semibold text-xl ml-4">{name}</p>
               {blue && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 48 48"
                  width="24px"
                  height="24px"
                >
                  <polygon
                    fill="#42a5f5"
                    points="29.62,3 33.053,8.308 39.367,8.624 39.686,14.937 44.997,18.367 42.116,23.995 45,29.62 39.692,33.053 39.376,39.367 33.063,39.686 29.633,44.997 24.005,42.116 18.38,45 14.947,39.692 8.633,39.376 8.314,33.063 3.003,29.633 5.884,24.005 3,18.38 8.308,14.947 8.624,8.633 14.937,8.314 18.367,3.003 23.995,5.884"
                  />
                  <polygon
                    fill="#fff"
                    points="21.396,31.255 14.899,24.76 17.021,22.639 21.428,27.046 30.996,17.772 33.084,19.926"
                  />
                </svg>
              )}
            </div>
            </div>
          <div className=" flex gap-3 cursor-pointer bg-blue-700 w-full px-3 p-4 transition-all delay-150">
            <img src="/images/icons/Home.svg" />
            <p className=" text-white text-lg">HOME</p>
          </div>
          <Link to={ROUTES.AddPost}>
          <div className=" flex gap-3 cursor-pointer transition-all px-3 delay-150">
            <img src="/images/icons/add_post.svg" />
            <p className=" text-white text-lg">Create Post</p>
          </div>
          </Link>
          <Link to={ROUTES.status}>
          <div className=" flex gap-3 cursor-pointer transition-all px-3 delay-150">
            <img src="/images/icons/add_story.svg" />
            <p className=" text-white text-lg">Add Story</p>
          </div>
          </Link>
          <Link to={`/p/${name}`}>
          <div className=" flex gap-3 cursor-pointer transition-all px-3 delay-150">
            <img src="/images/icons/Person.svg" />
            <p className=" text-white text-lg">Profile</p>
          </div>
          </Link>
          <div className=" flex gap-3 cursor-pointer transition-all px-3 delay-150">
            <img src="/images/icons/setting.svg" />
            <p className=" text-white text-lg">Settings</p>
          </div>
          <div className=" flex gap-3 cursor-pointer transition-all px-3 delay-150"
          onClick={() => signOut(auth)}>    
          <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="#ffff"
                class="w-8 h-8 cursor-pointer"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
                />
                </svg>
            <p className=" text-white text-lg">LogOut</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navigation;
