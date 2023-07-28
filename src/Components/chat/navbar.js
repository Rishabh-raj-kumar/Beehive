import React from 'react'

function Navbar() {
  return (
    <div className=' h-12 p-3 flex items-center justify-between bg-slate-700 text-white'>
      <div className=' font-bold'>BeeHive</div>
        <div className=' flex gap-3'>
          <img src="" alt="" className=' w-6 h-6 rounded-full  object-cover'/>
          <span>John</span>
          <button className=' border-none text-xs bg-slate-600 px-2 text-white '>LogOut</button>
        </div>
    </div>
  )
}

export default Navbar