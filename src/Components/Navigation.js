import { getAuth, signOut } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { firebase } from "../firebase/firebase";
import * as ROUTES from "../constants/routes";
import { Link } from "react-router-dom";
import useUser from "../hooks/useuser";
import { useMediaQuery } from "react-responsive";
import Skeleton from "react-loading-skeleton";
import {
  collection,
  getDoc,
  getDocs,
  getFirestore,
  orderBy,
  query,
} from "firebase/firestore";

function Navigation({ mobi, setMobi }) {
  const isTablet = useMediaQuery({ maxWidth: 1024 });
  const isMobile = useMediaQuery({ query: "(max-width: 500px)" });
  const auth = getAuth(firebase);
  const { user: profile } = useUser();
  const [image, setImage] = useState(null);
  const [name, setName] = useState("");
  const [blue, setBlue] = useState(null);
  const [fullname, setFullname] = useState("");
  const [contact, setcontacts] = useState([]);
  const [search, setsearch] = useState("");
  const [filteredcontacts, setfilteredcontacts] = useState([]);

  useEffect(() => {
    const db = getFirestore(firebase);
    const fetchdata = async () => {
      const col = collection(db, "users");
      const q = query(col, orderBy("dateCreated"));
      const data = await getDocs(q);
      setcontacts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    fetchdata();
  }, []);

  useEffect(() => {
    try {
      if (profile) {
        setImage(profile[0].image);
        setName(profile[0].username);
        setBlue(profile[0].ImportPers);
        setFullname(profile[0].fullname);
      }
    } catch (err) {
      //   console.log(err);
    }
  }, [profile]);

  useEffect(() => {
    console.log(contact);
  }, [search, contact]);

  useEffect(() => {
    setfilteredcontacts(
      contact.filter(
        (user) =>
          user.username.toLowerCase().includes(search.toLowerCase()) ||
          user.fullname.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, contact]);

  // console.log(filteredcontacts)

  return (
    <>
      {!mobi && (
        <div className=" font-poppins relative col-span-1 z-40">
          <div
            className=" w-auto md:max-w-sm  h-screen bg-black fixed left-0  top-0
       shadow-gray-50"
            style={{ boxShadow: "5px 0px 30px 5px rgba(255,255,255,0.3)" }}
          >
            <div className=" flex flex-col justify-between items-start py-4 w-full h-full">
              <div className=" w-full flex items-center justify-between px-3 border-b-2 border-gray-400">
                <h1 className=" text-white text-2xl font-medium pb-4">
                  Beehive
                </h1>
                {isMobile && (
                  <div
                    className="text-2xl font-medium pb-4"
                    onClick={() => setMobi((mobi) => !mobi)}
                  >
                    <svg
                      width="32px"
                      height="32px"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M6.75827 17.2426L12.0009 12M17.2435 6.75736L12.0009 12M12.0009 12L6.75827 6.75736M12.0009 12L17.2435 17.2426"
                        stroke="#fff"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </div>
                )}
              </div>
              <div className="flex flex-col gap-4 w-full">
                <div className=" z-1 w-full relative">
                  <div className=" flex gap-3 items-center cursor-pointer transition-all px-3 delay-150">
                    <input
                      type="text"
                      placeholder="search Users"
                      className=" p-2 rounded-full"
                      onChange={(e) => {
                        setsearch(e.target.value);
                        console.log(search);
                      }}
                    />
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      class="w-6 h-6 -translate-y-1"
                    >
                      <path
                        d="M11 6C13.7614 6 16 8.23858 16 11M16.6588 16.6549L21 21M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z"
                        stroke="#ffffff"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </div>
                  {search.length > 0 && (
                    <div className=" z-50 flex flex-col gap-3 p-1 absolute bg-white w-full">
                      {filteredcontacts.slice(0, 3).map((contact) => [
                        <Link to={`/p/${contact.username}`}>
                          {console.log(contact)}
                          <div className="flex gap-2 ml-3 mt-2">
                            <img
                              src={contact.image}
                              className="w-6 h-6 rounded-full"
                            />
                            <p className=" text-sm font-semibold">
                              {contact.username}
                            </p>
                            {contact.ImportPers && (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 48 48"
                                width="20px"
                                height="20px"
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
                        </Link>,
                      ])}
                    </div>
                  )}
                </div>
                <div
                  className=" flex gap-3 cursor-pointer w-full px-3 p-4 transition-all delay-150"
                  style={{
                    background:
                      "linear-gradient(90deg, #FC466B 0%, #3F5EFB 100%)",
                  }}
                >
                  <img src="/images/icons/Home.svg" />
                  <p className=" text-white text-lg">HOME</p>
                </div>
                <Link to={ROUTES.Chat}>
                  <div className=" flex gap-3 cursor-pointer transition-all px-3 delay-150">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="#fff"
                      class="w-6 h-6 -rotate-45 -translate-y-1"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
                      />
                    </svg>
                    <p
                      className={` text-white ${
                        isMobile ? " text-base" : "text-lg"
                      }`}
                    >
                      Chat
                    </p>
                  </div>
                </Link>
                <Link to={ROUTES.AddPost}>
                  <div className=" flex gap-3 cursor-pointer transition-all px-3 delay-150">
                    <img src="/images/icons/add_post.svg" />
                    <p
                      className={` text-white ${
                        isMobile ? " text-base" : "text-lg"
                      }`}
                    >
                      Create Post
                    </p>
                  </div>
                </Link>
                <Link to={ROUTES.beeCol}>
                  <div className=" flex gap-3 cursor-pointer transition-all px-3 delay-150">
                    <img src="/images/icons/Bee_colony.svg" />
                    <p
                      className={` text-white ${
                        isMobile ? " text-base" : "text-lg"
                      }`}
                    >
                      Bee colony
                    </p>
                  </div>
                </Link>
                <Link to={ROUTES.status}>
                  <div className=" flex gap-3 cursor-pointer transition-all px-3 delay-150">
                    <img src="/images/icons/add_story.svg" />
                    <p
                      className={` text-white ${
                        isMobile ? " text-base" : "text-lg"
                      }`}
                    >
                      Add Story
                    </p>
                  </div>
                </Link>
                <Link to={`/p/${name}`}>
                  <div className=" flex gap-3 cursor-pointer transition-all px-3 delay-150">
                    <img src="/images/icons/Person.svg" />
                    <p
                      className={` text-white ${
                        isMobile ? " text-base" : "text-lg"
                      }`}
                    >
                      Profile
                    </p>
                  </div>
                </Link>
                <Link to={ROUTES.Settings}>
                <div className=" flex gap-3 cursor-pointer transition-all px-3 delay-150">
                  <img src="/images/icons/setting.svg" />
                  <p
                    className={` text-white ${
                      isMobile ? " text-base" : "text-lg"
                    }`}
                  >
                    Settings
                  </p>
                </div>
                </Link>
                <div
                  className=" flex gap-3 cursor-pointer transition-all px-3 delay-150"
                  onClick={() => signOut(auth)}
                >
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
                  <p
                    className={` text-white ${
                      isMobile ? " text-base" : "text-lg"
                    }`}
                  >
                    LogOut
                  </p>
                </div>
              </div>
              {image ? (
                <div className=" w-full flex items-center px-3">
                  <img
                    src={image}
                    alt="profile"
                    className={` ${
                      isMobile ? "w-10 h-10" : "w-16 h-16"
                    } rounded-full object-cover`}
                  />
                  <div className=" flex gap-2 items-center">
                    <>
                      <div>
                        <div className=" flex gap-2">
                          <p
                            className={` text-white ${
                              isMobile ? " text-base" : "text-xl"
                            } font-semibold ml-4`}
                          >
                            @{name}
                          </p>
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
                        <p
                          className={` text-white ${
                            isMobile ? " text-base" : "text-xl"
                          } ml-4`}
                        >
                          {fullname}
                        </p>
                      </div>
                    </>
                  </div>
                </div>
              ) : (
                <>
                  <Skeleton count={1} width={100} height={100} />
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Navigation;
