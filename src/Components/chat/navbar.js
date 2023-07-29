import React, { useEffect, useState } from 'react'
import useUser from '../../hooks/useuser';
import {firebase} from '../../firebase/firebase';
import {getAuth,signOut} from 'firebase/auth';

function Navbar() {
  const {user} = useUser();
  const [photo,setPhoto] = useState(null);
  const [name,setName] = useState('');

  useEffect(() =>{
      try{
        if(user){
          // console.log(user)
          setPhoto(user[0].image);
          setName(user[0].username);
        }
      }catch(err){
        console.log(err);
      }
  },[user])

  return (
    <div className=' h-12 p-3 flex items-center justify-between bg-slate-700 text-white'>
      <div className=' font-bold'>BeeHive</div>
        <div className=' flex gap-3'>
          <img src={photo} alt="" className=' w-6 h-6 rounded-full object-contain'/>
          <span className=' text-sm'>{name}</span>
        </div>
    </div>
  )
}

export default Navbar