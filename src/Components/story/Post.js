import React, { useEffect, useState } from "react";
import { firebase } from "../../firebase/firebase";
import { deleteStatus } from "../../services/firebase";
import { Timestamp, collection, getDocs, getFirestore, query, where } from "firebase/firestore";
import useUser from "../../hooks/useuser";

function Post({ setPlay, play, followedUserImg, video, docs,dateCreate }) {
  const [data, setData] = useState(null);
  const db=getFirestore(firebase);
  const [profId,setProfId] = useState(null);
  const {user} = useUser();
  const [profUser,setProfUser] = useState(null);
  // console.log(user);
  useEffect(() => {
    async function getUser() {
      try {
        const q = query(collection(db, "status"), where("userId", "==", docs), where('createdAt',"==",dateCreate));
        const doc = await getDocs(q);
        const  users = doc.docs.map((doc) => ({
          ...doc.data(),
          docId: doc.id,
        }));

        // console.log(users[0].userId);
        setData(users[0].docId);
        setProfId(users[0].userId);
      
      } catch (err) {
        console.log(err);
      }
    }
    getUser();
  }, [docs,dateCreate]);

  useEffect(() =>{
       try{
            if(data){
              // console.log(data)
              document.querySelector('#deletebtn').addEventListener('click',async()=>{
                const res = await deleteStatus(data,video);
                // console.log(res)
              })
            }
       }catch(err){
        console.log(err)
       }
  },[data])

  useEffect(() =>{
        try{
            console.log(user[0])
            setProfUser(user[0]);
        }catch(err){
      console.log(err)}
  },[user])

  return (
    <div className=" w-full h-screen overflow-hidden absolute top-0 md:top-32 md:left-1/4 ">
      <div className="relative w-full h-full md:w-1/2 aspect-square md:aspect-video bg-blue-300 shadow-xl">
        <div className=" flex gap-2 z-30 absolute top-3 right-4">
          <div className="" onClick={() => setPlay(!play)}>
            <img
              width="20"
              height="20"
              src="https://img.icons8.com/ios-filled/50/close-window.png"
              alt="close-window"
            />
          </div>
          {profUser && <div>
          {profUser.userId === profId ? (<div id="deletebtn">
            <svg
              width="20px"
              height="20px"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10 12V17"
                stroke="#000000"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M14 12V17"
                stroke="#000000"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M4 7H20"
                stroke="#000000"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M6 10V18C6 19.6569 7.34315 21 9 21H15C16.6569 21 18 19.6569 18 18V10"
                stroke="#000000"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z"
                stroke="#000000"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>) : null}</div>}
        </div>
        <div className="--status_user bg-gray-300 w-10 h-10 rounded-full absolute left-2 top-2 overflow-hidden">
          {followedUserImg && (
            <img src={followedUserImg} className="w-10 h-10 object-cover" />
          )}
        </div>
        <div className="w-full h-full grid place-items-center">
          <video autoPlay={true} className=" w-full h-auto">
            <source src={video} type="video/mp4" />
          </video>
        </div>
      </div>
    </div>
  );
}

export default Post;
