import React, { useState } from 'react'
import * as ROUTES from '../constants/routes';
import { useNavigate } from 'react-router-dom';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import { firebase } from '../firebase/firebase';

function PasswordReset() {
    const auth = getAuth(firebase)
    const [inpVal,setInpVal] = useState('');
    const navigate = useNavigate();
    const handleReset = () =>{
        sendPasswordResetEmail(auth,inpVal).then(() =>{
            console.log('success')
        }).catch((err) =>{
            console.log(err)
        })
          navigate(`${ROUTES.checkEmail}`);
    }
  return (
    <div className=' w-full grid place-content-center'>
    <form onSubmit={handleReset} className=' mt-24 flex flex-col'>
         <input type="text"
         placeholder='Registered Email'
         onChange={(e) => setInpVal(e.target.value)}
         className=' p-3 text-lg font-poppins border-black border'/>
         <input type='submit' value="Reset"
         className=' mt-3 rounded-full p-3 text-lg font-poppins outline-none bg-blue-400'/>
    </form>
    </div>
  )
}

export default PasswordReset