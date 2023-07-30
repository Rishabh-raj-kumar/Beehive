import { useState, useEffect } from "react";
import { firebase } from "../../firebase/firebase";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import useUser from "../../hooks/useuser";

const Search = ({ CurrUser }) => {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState("");
  const [CurrUserId, setCurrUserId] = useState(null);
  const [CurrUserName, setCurrUserName] = useState(null);
  const [CurrUserImage, setCurrUserImage] = useState(null);
  const db = getFirestore(firebase);

  const handleSearch = async () => {
    try {
      // console.log(username)
      const result = collection(db, "users");
      const q = query(result, where("username", "==", username));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setUser(doc.data());
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    try {
      if (CurrUser) {
        // console.log(user)
        setCurrUserId(CurrUser[0].userId);
        setCurrUserName(CurrUser[0].fullname);
        setCurrUserImage(CurrUser[0].image);
      }
    } catch (err) {
      console.log(err);
    }
  }, [CurrUser]);

  const handleEvent = (e) => {
     handleSearch();
  };

  const handleSelect = async (CurrUserId, CurrUserImage, CurrUserName) => {
    console.log(CurrUserId, CurrUserImage, CurrUserName);
    //check wether the chats exist in group or not.. if not create new.
    const combineId =
      CurrUserId > user.userId
        ? CurrUserId + user.userId
        : user.userId + CurrUserId;
    const res = await getDoc(doc(db, "chats", combineId));

    if (!res.exists()) {
      //create a chat in chat collection.
      await setDoc(doc(db, "chats", combineId), { messages: [] });
      console.log(CurrUserId, user.userId);

      await updateDoc(doc(db, "userChats", CurrUserId), {
        [combineId + ".userInfo"]: {
          uid: user.userId,
          displayName: user.fullname,
          photoUrl: user.image,
        },
        [combineId + ".date"]: serverTimestamp(),
      }).then(() => {
        alert("data updated");
      });

      await updateDoc(doc(db, "userChats", user.userId), {
        [combineId + ".userInfo"]: {
          uid: CurrUserId,
          displayName: CurrUserName,
          photoUrl: CurrUserImage,
        },
        [combineId + ".date"]: serverTimestamp(),
      });
    }

    setUser(null);
    setUsername("");
  };

  return (
    <div className=" border-b-2 border-gray-400">
      <div className="p-2 flex">
        <input
          type="text"
          placeholder="Search"
          value={username}
          className=" bg-slate-800 border-none outline-none w-full text-white"
          onChange={(e) => setUsername(e.target.value)}
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-6 h-6 text-white"
          onClick={handleEvent}
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
          />
        </svg>
      </div>
      {username.length > 0 ? (
        <>
          {user.image && (
            <div
              id="box"
              className=" p-3 flex items-center gap-3 cursor-pointer hover:bg-slate-600 text-white"
              onClick={() =>
                handleSelect(CurrUserId, CurrUserImage, CurrUserName)
              }
            >
              {user.image && (
                <img
                  src={user.image}
                  className=" w-12 h-12 rounded-full object-cover"
                />
              )}
              {user.username && (
                <div className="">
                  <span>{user.username}</span>
                </div>
              )}
            </div>
          )}
        </>
      ) : null}
    </div>
  );
};
export default Search;
