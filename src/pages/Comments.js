import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { doc, getDoc, getDocs, getFirestore } from "firebase/firestore";
import { firebase } from "../firebase/firebase";
import Loader from "../Components/Loader";

function Comments() {
  const { docId } = useParams();
  const [post, setPost] = useState([]);
  const [loading,setLoading] = useState(false);

  useEffect(() => {
    async function checkPostExists() {
      const db = getFirestore(firebase);
      const docRef = doc(db, "photos", docId);
      try {
        const res = await getDoc(docRef);
        if (res.exists()) {
          console.log(res.data());
          setPost(res.data());
        }
      } catch (err) {
        console.log(err);
      }
    }
    checkPostExists();
  }, []);

  useEffect(() =>{
    try{
       if(post){
        console.log(post.comments)
      }
    }catch(err){
      console.log(err);
    }
  },[post])

  return(
    <>
    {loading ? (<>
    <Loader/>
    </>) : (
    <div className="grid place-items-center w-full h-screen">
      <div className=" bg-slate-50 shadow p-3 rounded">
    {post.comments && post.comments.map((x)=>(
        <>
        <div className="mt-3 flex gap-2">
        <h1 className=" text-lg font-bold capitalize cursor-pointer">{x.displayName}</h1>
        <p>{x.comment}</p>
        </div>
        </>
      ))}
      </div>
      </div>)
    }
    </>
  );
}

export default Comments;
