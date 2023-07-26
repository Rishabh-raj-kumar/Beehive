import React, { useEffect, useRef, useState } from 'react'
import Header from './header'
import Actions from './actions'
import Footer from './Footer';
import Comments from './comments';
import useUser from '../../hooks/useuser';

function Post({ key, content}) {
  const commonInput = useRef(null);
  const {user} = useUser();
  const handleFocus = () => commonInput.current.focus();
  const [image,setImage] = useState(null)

  useEffect(() =>{
    try{
       if(user){
        setImage(user[0].image);
       }
      }catch(err){
        console.log(err)
      }
  },[user])

  return (
    <div className=' rounded bg-white mb-8 col-span-4 border mt-2 shadow'>
    <Header username={content.username} img={image}/>
    <img src={content.imageSrc}/>
    <Actions 
    content={content}
    docId={content.docId}
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