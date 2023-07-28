import React from 'react'
import Navbar from './navbar';
import Search from './search';
import Chats from './chats';

function Sidebar() {
  return (
    <div className='flex-1 bg-slate-800 rounded-l-lg'>
      <Navbar/>
      <Search />
      <Chats />
    </div>
  )
}

export default Sidebar