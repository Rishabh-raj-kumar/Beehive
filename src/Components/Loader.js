import React from 'react'

function Loader() {
  return (
    <div className='load w-screen grid place-items-center'>
        <img src={'/images/circle-loading-lines.gif'}
        className=' w-56 h-56'/>
    </div>
  )
}

export default Loader