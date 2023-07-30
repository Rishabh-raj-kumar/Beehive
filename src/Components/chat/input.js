import React, { useContext, useState } from "react";
import useUser from "../../hooks/useuser";
import { ChatContext } from "../../context/chatContext";
import {
  Timestamp,
  arrayUnion,
  doc,
  getFirestore,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { firebase } from "../../firebase/firebase";
import { v4 as uuid } from "uuid";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";

function Input() {
  const db = getFirestore(firebase);
  const [text, setText] = useState("");
  const [img, setImg] = useState(null);

  const { user } = useUser();
  const { data } = useContext(ChatContext);

  const handleChange = async () => {
    if (img) {
      const storage = getStorage();
      const storageRef = ref(storage, uuid());
      const uploadTask = uploadBytesResumable(storageRef, img);

      uploadTask.on((error) =>{
        console.log(error);
      },() =>{
        getDownloadURL(uploadTask.snapshot.ref).then( async (URL) =>{
             await updateDoc(doc(db,"chats",data.chatId),{
              messages: arrayUnion({
                id: uuid(),
                text,
                senderId: user[0].userId,
                date: Timestamp.now(),
                img : URL
              }),
             })
        })
      })
    } else {
      await updateDoc(doc(db, "chats", data.chatId), {
        messages: arrayUnion({
          id: uuid(),
          text,
          senderId: user[0].userId,
          date: Timestamp.now(),
        }),
      });
    }

    console.log(user[0].userId)
    await updateDoc(doc(db,"userChats",user[0].userId),{
      [data.chatId+'.lastMessage']:{
        text
      },
      [data.chatId+'.date']: serverTimestamp()
    });

    await updateDoc(doc(db,"userChats",data.user.uid),{
      [data.chatId+'.lastMessage']:{
        text
      },
      [data.chatId+'.date']: serverTimestamp()
    });

    setText("");
    setImg(null);
  };

  return (
    <div className=" z-50 h-12 p-3 bg-slate-300 flex items-center justify-between">
      <input
        type="text"
        placeholder="Enter the message..."
        className=" w-full border-none outline-none text-lg bg-slate-300 text-slate-700 placeholder:text-slate-700"
        onChange={(e) => setText(e.target.value)}
        value={text}
      />
      <div className="flex gap-3 items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-6 h-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32m.009-.01l-.01.01m5.699-9.941l-7.81 7.81a1.5 1.5 0 002.112 2.13"
          />
        </svg>

        <input
          type="file"
          className="hidden"
          id="file"
          onChange={(e) => setImg(e.target.files[0])}
        />
        <label htmlFor="file">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
            />
          </svg>
        </label>
        <button
          className="p-1 px-2 bg-blue-500 border-none outline-none"
          onClick={handleChange}
        >
          send
        </button>
      </div>
    </div>
  );
}

export default Input;
