import React, { useEffect, useState } from "react";
import { getUserByUserId } from "../../services/firebase";
import { doc, getDoc, getFirestore, serverTimestamp, setDoc, updateDoc } from "firebase/firestore";
import { firebase } from "../../firebase/firebase";

function UserSuggested({ userId }) {
    const [user,setUser] = useState('');
    const [CurrUserId,setCurrUserId] = useState('');
    const [CurrUserImage,setCurrUserImage] = useState('');
    const [CurrUserName,setCurrUserName] = useState('');
    const db = getFirestore(firebase);

    useEffect(() =>{
        const handleUser =async() =>{
         try{
            const res = await getUserByUserId(userId);
            // console.log(res[0])
            setUser(res[0]);
            setCurrUserId(res[0].userId)
            setCurrUserName(res[0].fullname)
            setCurrUserImage(res[0].image)
         }catch(err){
            console.log(err)
         }
        }
        handleUser();
    },[])

    const handleSelect = async (CurrUserId, CurrUserImage, CurrUserName) => {
        // console.log(CurrUserId, CurrUserImage, CurrUserName);
        //check wether the chats exist in group or not.. if not create new.
        const combineId =
          CurrUserId > user.userId
            ? CurrUserId + user.userId
            : user.userId + CurrUserId;
        const res = await getDoc(doc(db, "chats", combineId));
    
        if (!res.exists()) {
          //create a chat in chat collection.
          await setDoc(doc(db, "chats", combineId), { messages: [] });
        //   console.log(CurrUserId, user.userId);
    
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
      };

  return (
    <>
      {user && user.image && (
        <div
          id="box"
          className=" w-20 md:w-auto p-3 flex items-center gap-3 cursor-pointer hover:bg-slate-600 text-white"
          onClick={() => handleSelect(CurrUserId, CurrUserImage, CurrUserName)}
        >
          {user.image && (
            <img
              src={user.image}
              className=" w-12 h-12 rounded-full object-cover"
            />
          )}
          {user.username && (
            <div className="hidden md:block">
              <span>{user.username}</span>
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default UserSuggested;
