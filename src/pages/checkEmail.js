import React from 'react'
import { Link } from 'react-router-dom'
import * as ROUTES from "../constants/routes";

function Verify() {
  return (
    <div className='w-full h-screen grid place-items-center'>
        <div className=' bg-white shadow-xl p-4 rounded'>
        <p className=' font-semibold text-lg'>Before Proceeding Please Check your email to Reset Password.</p>
        <p className=' mt-3 text-lg'><span className=' font-bold text-lg'>Note : </span> Please don't go back before you reset Password.</p>
         <Link to={`${ROUTES.LOGIN}`}>
         <button className=' p-1 px-2 bg-blue-700 text-white'>Back to Login</button>
         </Link>
        </div>
    </div>
  )
}

export default Verify