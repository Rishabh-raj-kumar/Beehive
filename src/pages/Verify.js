import React from 'react'
import { Link } from 'react-router-dom'
import * as ROUTES from "../constants/routes";

function Verify() {
  return (
    <div className='w-full h-screen grid place-items-center'>
        <div className=' bg-white shadow-xl p-4 rounded'>
        <p className=' font-bold text-lg'>Wishing You a happy Journey 😊❤️.</p>
        <p>Before Proceeding Please Verify you email to confirm it's You.</p>
        <p className=' mt-3'><span className=' font-bold text-lg'>Note : </span> Please don't go back before verfiying.</p>
         <Link to={`${ROUTES.DASHBOARD}`}>
         <button className=' p-2 bg-blue-700 text-white'>Back</button>
         </Link>
        </div>
    </div>
  )
}

export default Verify