import React from 'react'
import Message from './message';

function Messages() {
  return (
    <div className=' bg-slate-200 p-3' style={{ height : 'calc(100% - 95px)'}}>
      <Message/>
      <Message/>
      <Message/>
    </div>
  )
}

export default Messages