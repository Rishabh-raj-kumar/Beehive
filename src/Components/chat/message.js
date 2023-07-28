import React from 'react'

function Message() {
  return (
    <div className='flex gap-5 owner'>
      <div className='flex flex-col mb-5 text-slate-500'>
         <img src="" alt=''
         className=' w-10 h-10 object-cover rounded-full'/>
         <span>Just now</span>
      </div>
      <div className=' flex flex-col gap-2' style={{ maxWidth : '80%'}}>
        <p className='para bg-slate-800 text-white px-3 py-2 max-w-max'>Hello</p>
        <img src="" alt="" className='w-1/2'/>
      </div>
    </div>
  )
}

export default Message