import { doc, getFirestore, onSnapshot } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { firebase } from "../../firebase/firebase";
import useUser from "../../hooks/useuser";
import { ChatContext } from "../../context/chatContext";

function Chats() {
  const db = getFirestore(firebase);
  const [chats, setChats] = useState("");
  const [CurrUser, setCurrUser] = useState(null);
  const [CurrUserId, setCurrUserId] = useState(null);
  const [CurrUserName, setCurrUserName] = useState(null);
  const { user } = useUser();
  const {dispatch} = useContext(ChatContext);

  // console.log(user)
  useEffect(() => {
    try {
      if (user) {
        // console.log(user);
        setCurrUser(user);
        setCurrUserId(user[0].userId);
        setCurrUserName(user[0].fullname);
      }
    } catch (err) {
      console.log(err);
    }
  }, [user]);

  useEffect(() => {
    try {
      // console.log(CurrUserId, CurrUserName);
      const getChats = () => {
        const unSub = onSnapshot(
          doc(db, "userChats", CurrUser[0].userId),
          (doc) => {
            // console.log("current data", doc.data());
            setChats(doc.data());
          }
        );
        return () => {
          unSub();
        };
      };
      CurrUserId && getChats();
    } catch (err) {
      console.log(err);
    }
  }, [CurrUserId, CurrUserName]);

  const handleSelect = (u) =>{
       dispatch({ type : "CHANGE_USER",payload :u })
  }

  return (
    <div className="flex gap-1 md:block">
      { chats && Object.entries(chats)?.sort((a,b) => b[1].date - a[1].date).map((chat) => (
        //  console.log(chat);
        <div className=" w-20 md:w-auto p-3 flex items-center gap-3 cursor-pointer hover:bg-slate-600 text-white"
        key={chat[1].uid}
           onClick={() => handleSelect(chat[1].userInfo)}>
          <img
            src={chat[1].userInfo?.photoUrl ? chat[1].userInfo.photoUrl : null}
            className=" w-12 h-12 rounded-full object-cover"
          />
          <div className=" hidden md:block">
            <span>{chat[1].userInfo?.displayName ? chat[1].userInfo?.displayName : null }</span>
            <p className=" text-gray-400">{chat[1].lastMessage?.text ? chat[1].lastMessage?.text : null}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Chats;
