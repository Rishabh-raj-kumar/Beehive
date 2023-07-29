import React, { useEffect } from 'react'
import Navbar from './navbar';
import Search from './search';
import Chats from './chats';
import useUser from '../../hooks/useuser';

function Sidebar() {
  const {user} = useUser();
  
  useEffect(() =>{
    try{
      if(user){
        console.log(user)
      }
    }catch(err){
      console.log(err)
    }
  },[user])
  
  return (
    <div className='flex-1 bg-slate-800 rounded-l-lg'>
      <Navbar/>
      <Search CurrUser={user} />
      <Chats />
    </div>
  )
}

export default Sidebar