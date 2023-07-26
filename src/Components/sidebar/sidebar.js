import React, { useEffect, useState } from 'react'
import useUser  from '../../hooks/useuser';
import Suggestions from './suggestion';
import User from './user';

function Sidebar() {
  const { user } = useUser();
  const [fullname,setFullName] = useState('');
  const [username,setUserName] = useState('');
  const [userId,setUserId] = useState('');
  const [following,setFollowing] = useState('');
  const [docId,setDoc] = useState('');
  const [image,setImage] =useState('');

  useEffect(() =>{
    try{
    if(user){
      // usr was in first index of array so we used shift..
      const {fullname,username,userId,image,following, docId} = user.shift();
      console.log()
      setFullName(fullname);
      setUserName(username);
      setImage(image);
      setUserId(userId);
      setFollowing(following);
      setDoc(docId);
    }
  }catch(err){
    console.log(err)
  }
  },[user])

  return (
    <>
    <div className='p-4'>
    <User fullname={fullname} username={username} image={image}/>
    <Suggestions userId={userId} following={following} loggedInUserDocId={docId}/>
    </div>
    </>
  )
}

export default Sidebar