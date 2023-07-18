import React, { useEffect, useState } from 'react'
import useUser  from '../../hooks/useuser';
import Suggestions from './suggestion';
import User from './user';

function Sidebar() {
  const {user } = useUser();
  const [fullname,setFullName] = useState('');
  const [username,setUserName] = useState('');
  const [userId,setUserId] = useState('');

  useEffect(() =>{
    if(user[0]){
      setFullName(user[0].fullname);
      setUserName(user[0].username);
      setUserId(user[0].userId);
    }
  },[user])

  return (
    <>
    <User fullname={fullname} username={username}/>
    <Suggestions userId={userId}/>
    </>
  )
}

export default Sidebar