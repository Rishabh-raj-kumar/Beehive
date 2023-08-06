import React from 'react'

function Loader() {
  return (
    <div className=' w-screen h-screen grid place-items-center'>
        <img src={'/images/circle-loading-lines.gif'}
        className=' w-56 h-56'/>
    </div>
  )
}

export default Loader