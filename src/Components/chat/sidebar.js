import React, { useEffect } from 'react'
import Navbar from './navbar';
import Search from './search';
import Chats from './chats';
import useUser from '../../hooks/useuser';
import UserPresent from './UserPresent';

function Sidebar() {
  const {user} = useUser();
  
  useEffect(() =>{
    try{
      if(user){
        // console.log(user)
      }
    }catch(err){
      console.log(err)
    }
  },[user])
  
  return (
    <div className='md:flex-1 overflow-x-scroll bg-slate-800 rounded-l-lg md:overflow-scroll'>
      <Navbar/>
      <Search CurrUser={user} />
      <div className='flex flex-1 md:flex-col overflow-scroll'>
      <UserPresent user={user}/>
      <Chats />
      </div>
    </div>
  )
}

export default Sidebar