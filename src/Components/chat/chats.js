import React from 'react'

function Chats() {
  return (
    <div className='chats'>
      <div className=" p-3 flex items-center gap-3 cursor-pointer hover:bg-slate-600 text-white">
            <img src="" className=" w-12 h-12 rounded-full object-cover"/>
            <div className="">
                <span>Jane</span>
                <p>Hello world</p>
            </div>
        </div>
    </div>
  )
}

export default Chats