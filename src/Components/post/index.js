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
    <div className='mx-3 mb-8 col-span-4 mt-2 shadow-[15px_15px_30px_rgb(25,25,25),-15px_-15px_30px_rgb(60,60,60)] rounded-t-[30px]'
    style={{ background: '#000'}}>
    <Header username={content.username} img={profileImage}/>
    <img src={content.imageSrc} className=' m-1 mx-auto object-cover h-52'/>
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