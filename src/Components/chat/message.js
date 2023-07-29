import React, { useContext, useEffect, useRef } from 'react'
import useUser from '../../hooks/useuser'
import { ChatContext } from '../../context/chatContext';

function Message({message,user}) {
  const {data} = useContext(ChatContext);
  const ref = useRef();

  useEffect(() =>{
     ref.current?.scrollIntoView({ behaviour : 'smooth'});
  },[message])
 
  return (
    <div ref={ref}
     className={`flex gap-5 ${!(message.senderId === user[0].userId) && "owner"}`}>
      <div className='flex flex-col mb-5 text-slate-500'>
         <img src={`${message.senderId === user[0].userId ?
         user[0].image : data.user.photoUrl}`} alt=''
         className=' w-10 h-10 object-cover rounded-full'/>
      </div>
      <div className=' flex flex-col gap-2' style={{ maxWidth : '80%'}}>
        <p className='para bg-slate-800 text-white px-3 py-2 max-w-max'>{message.text}</p>
        {message.img  && <img src={message.img} alt="" className='w-1/2'/>}
      </div>
    </div>
  )
}

export default Message