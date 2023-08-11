import React, { useEffect, useState } from "react";
import useUser from "../../hooks/useuser";
import { updateFreinds,getUserByUserId } from "../../services/firebase";

function Notification() {
  const [notif, setNotif] = useState(null);
  const [recievedRequest,setRecieved] = useState([])
  const [prof,setProf] = useState([]);
  const {user} = useUser();

  useEffect(() =>{
    try{
        if(user){
          console.log(user[0].recievedRequest)
          setRecieved(user[0].recievedRequest)
          setNotif(user[0].recievedRequest.length());
        }
      }catch(err){
        console.log(err)
      }
  },[user])

  useEffect(() =>{
    const handleChange = async () =>{
        try{
          const res = await Promise.all(recievedRequest.map(async (x) =>{
            const users = await getUserByUserId(x);
            setProf([...prof,users[0]]);
          }))
        }catch(err){
          console.log(err)
        }}
        handleChange();
  },[recievedRequest])

  useEffect(() =>{
    try{
    if(prof){
      console.log(prof)
    }}catch(err){
      console.log(err)
    }
  },[prof])

  const handleRequest = async(docId,userId) =>{
        console.log(docId,userId) 
        try{
          const res = await updateFreinds(docId,userId,user[0].userId,user[0].docId);

          if(res){
            alert('Now you are friends');
            location.reload();
          }
        }catch(err){
          console.log(err);
        }
  }
  return (
    <div className=" w-full bg-white mb-3 rounded">
      <div className=" flex items-center p-2 justify-between">
        <h1 className=" text-lg font-bold">Notification</h1>
        <div className="relative">
          <svg
            width="40px"
            height="40px"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M10.5 4.68727V3.75H13.5V4.68731C16.1369 5.35963 18.0833 7.76335 18.0833 10.6184V15.3158C18.0833 15.7194 18.2193 16.2984 18.3833 16.8298C18.4618 17.0841 18.5405 17.3084 18.5996 17.4689C18.6291 17.5489 18.6534 17.6125 18.6701 17.6553L18.6891 17.7034L18.6936 17.7147L18.6945 17.717L18 18.75H5.99996L5.30542 17.717L5.30632 17.7147L5.31085 17.7034L5.32979 17.6553C5.3465 17.6125 5.37086 17.5489 5.40032 17.4689C5.45941 17.3084 5.53817 17.0841 5.61665 16.8298C5.78067 16.2984 5.91663 15.7194 5.91663 15.3158V10.6184C5.91663 7.76329 7.8631 5.35953 10.5 4.68727ZM12 6C9.47329 6 7.41663 8.06309 7.41663 10.6184V15.3158C7.41663 15.9518 7.22451 16.7031 7.05676 17.25H16.9432C16.7754 16.7031 16.5833 15.9518 16.5833 15.3158V10.6184C16.5833 8.06309 14.5266 6 12 6ZM15 21H9.00004V19.5H15V21Z"
              fill="#000000"
            />
          </svg>
          {notif > 0 && (
            <p className=" w-4 h-4 absolute text-sm text-center top-0 right-2 bg-red-500 rounded-full">
              {notif}
            </p>
          )}
        </div>
      </div>
      {prof && <div>
        {prof.map((x) => (
            <div className=" flex justify-between p-2">
              {/* {console.log(x)} */}
              <div className=" flex gap-1">
              <img src={x.image} className=" w-8 h-8 rounded-full object-cover"/>
            <p className=" text-lg font-medium">{x.fullname}</p>
            </div>
            <div className=" flex gap-1">
              <button className=" p-1 bg-blue-600 text-white rounded"
              onClick={() => handleRequest(x.docId,x.userId)}>accept</button>
              <button className=" p-1 bg-red-600 text-white rounded">reject</button>
            </div>
          </div>
        ))}
      </div>}
    </div>
  );
}

export default Notification;
