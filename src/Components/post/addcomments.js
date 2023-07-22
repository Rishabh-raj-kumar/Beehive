import { useContext, useState } from "react";
import Firebasecontext from "../../context/firebase";
import userContext from "../../context/usercontext";
import { arrayUnion, doc, getFirestore, updateDoc } from "firebase/firestore";
import {  firebase } from '../../firebase/firebase';

export default function AddComments({ docId,comments , setComments, commentInput }){
   const [comment,setComment] = useState('');
   const {
    user : {displayName}
   } = useContext(userContext);

   const handleSubmit = (event) =>{
    event.preventDefault();

    //adding comments to firebase and fetching it..
    setComments([{ displayName, comment}, ...comments])
    setComment('');

    const db = getFirestore(firebase);
    const docs = doc(db,'photos',docId);

    const res = updateDoc(docs,{
        comments : arrayUnion({ displayName , comment})
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
             className=" py-4 outline-none border-none px-3 w-full"
             value={comment}
             onChange={(e) => setComment(e.target.value)}
             ref={commentInput} />
             <button
             className="cursor-pointer"
              disabled={comment.length < 1} onClick={handleSubmit}>
                POST
             </button>
        </form>
    </div>
   )
}