import React, { useEffect, useRef, useState } from 'react'
import Header from './header'
import Actions from './actions'
import Footer from './Footer';
import Comments from './comments';
import { getUserByUserId } from '../../services/firebase';

function Post({ key, content}) {
  const commonInput = useRef(null);
  const handleFocus = () => commonInput.current.focus();
  const [profileImage,setProfileImage] = useState(null);

  useEffect(() =>{
    async function getUser(){
    try{
      const res = await getUserByUserId(content.userId);
      //  console.log(res)
      setProfileImage(res[0].image);
    }catch(err){
      console.log(err)
    }
  }
  getUser();
  })

  return (
    <div className='mx-3 rounded-md bg-white mb-8 col-span-4 border mt-2 shadow'>
    <Header username={content.username} img={profileImage}/>
    <img src={content.imageSrc}/>
    <Actions 
    content={content}
    docId={content.docId}
    photoId={content.photoId}
    userIds={content.userId}
    totalLikes={content.likes.length}
    likedPhoto={content.userLikedPhotO}
    handleFocus={handleFocus}/>

    <Footer caption={content.caption} username={content.username}/>

    <Comments
     docId={content.docId}
     comments={content.comments}
     posted={content.dateCreated}
     commentInput={commonInput}
    />
    </div>
  )
}

export default Post