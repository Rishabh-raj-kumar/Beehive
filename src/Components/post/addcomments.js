import { useContext, useEffect, useState } from "react";
import Firebasecontext from "../../context/firebase";
import userContext from "../../context/usercontext";
import { arrayUnion, doc, getFirestore, updateDoc } from "firebase/firestore";
import {  firebase } from '../../firebase/firebase';
import useUser from "../../hooks/useuser";

export default function AddComments({ docId,comments , setComments, commentInput }){
   const [comment,setComment] = useState([]);
   const [name,setName] = useState('');
   const [userImg,setUserImg] = useState('');
   const [fullname,setFullname] = useState('');
   const {
    user 
   } = useUser();

   useEffect(() =>{
    try{
        if(user){
        //    console.log(user)
        setUserImg(user[0].image);
        setFullname(user[0].fullname);
        setName(user[0].username);
        }
    }catch(err){
        console.log('error in loading user');
    }
   },[user])

   const handleSubmit = (event) =>{
    event.preventDefault();

    //adding comments to firebase and fetching it..
    setComments([{name,fullname,userImg,comment}, ...comments])
    setComment('');

    const db = getFirestore(firebase);
    const docs = doc(db,'photos',docId);

    const res = updateDoc(docs,{
        comments : arrayUnion({ name,fullname,userImg, comment})
    })
    return res;
   }

   return(
    <div className=" border-t border-gray-500">
        <form className="flex justify-between pl-0 pr-5"
        onSubmit={event => comment.length >= 1  ? handleSubmit(event) : event.preventDefault()}>
            <input
            name="addcomment"
            placeholder="Enter the message"
             className=" py-4 outline-none border-none px-3 w-full bg-transparent text-white"
             value={comment}
             onChange={(e) => setComment(e.target.value)}
             ref={commentInput} />
             <button
             className="cursor-pointer text-white"
              disabled={comment.length < 1} onClick={handleSubmit}>
                POST
             </button>
        </form>
    </div>
   )
}