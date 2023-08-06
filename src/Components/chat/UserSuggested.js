import React, { useContext, useEffect, useState } from "react";
import { getUserByUserId, updateSuggestedFollowers } from "../../services/firebase";
import { doc, getDoc, getFirestore, onSnapshot, serverTimestamp, setDoc, updateDoc } from "firebase/firestore";
import { firebase } from "../../firebase/firebase";
import { ChatContext } from "../../context/chatContext";

function UserSuggested({ CurrUser,userId }) {
    const [user,setUser] = useState(null);
    const [CurrUserId,setCurrUserId] = useState(null);
    const [CurrUserImage,setCurrUserImage] = useState(null);
    const [CurrUserName,setCurrUserName] = useState(null);
    const [CurrUserDocId,setCurrUserDocId] = useState(null)
    const db = getFirestore(firebase);
    const {dispatch} = useContext(ChatContext);

    useEffect(() =>{
        const handleUser =async() =>{
         try{
            const res = await getUserByUserId(userId);
            // console.log(res[0])
            setUser(res[0]);
         }catch(err){
            console.log(err)
         }
        }
        handleUser();
    },[])
    useEffect(() => {
      try {
        if (CurrUser) {
          // console.log(user)
          setCurrUserId(CurrUser[0].userId);
          setCurrUserName(CurrUser[0].fullname);
          setCurrUserImage(CurrUser[0].image);
          setCurrUserDocId(CurrUser[0].docId);
        }
      } catch (err) {
        console.log(err);
      }
    }, [CurrUser]);

    const handleSelect = async (CurrUserId, CurrUserImage, CurrUserName) => {
        // console.log(CurrUserId, CurrUserImage, CurrUserName);
        //check wether the chats exist in group or not.. if not create new.
        const combineId =
          CurrUserId > user.userId
            ? CurrUserId + user.userId
            : user.userId + CurrUserId;
        const res = await getDoc(doc(db, "chats", combineId));
        // console.log(CurrUserId, user.userId);
     try{
        if (!res.exists()) {
          //create a chat in chat collection.
          console.log(user.userId,CurrUserId)
          await setDoc(doc(db, "chats", combineId), { messages: [] });
    
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


          await updateSuggestedFollowers(user.userId,CurrUserDocId).then(
            'suggestiion removed'
          );
        }
      }catch(err){
        console.log(err);
      }

      setUser(null);
      };

  return (
    <>
    {user && user.image && (
            <div
              id="box"
              className=" w-20 md:w-auto p-3 flex items-center gap-3 cursor-pointer hover:bg-slate-600 text-white"
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
