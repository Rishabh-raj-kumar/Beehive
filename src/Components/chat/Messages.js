import React, { useContext, useEffect, useState } from "react";
import Message from "./message";
import { ChatContext } from "../../context/chatContext";
import { doc, getFirestore, onSnapshot } from "firebase/firestore";
import { firebase } from "../../firebase/firebase";
import useUser from "../../hooks/useuser";

function Messages() {
  const {user} = useUser();
  const [messages, setMessages] = useState([]);
  const { data } = useContext(ChatContext);
  const db = getFirestore(firebase);
  // console.log(user)

  useEffect(() => {
    const unSub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
      doc.exists() && setMessages(doc.data().messages);
    });

    return () => {
      unSub();
    };
  }, [data.chatId]);
  return (
    <div className=" bg-slate-200 p-3 overflow-scroll overflow-x-hidden" style={{ height: "calc(100% - 95px)" }}>
      {
        messages.map((m) =>(
          <Message message={m} user={user}/>
        ))
      }
    </div>
  );
}

export default Messages;
