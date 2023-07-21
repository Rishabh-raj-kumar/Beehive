import React, { useRef } from 'react'
import Header from './header'
import Actions from './actions'

function Post({ key, content}) {
  const commonInput = useRef(null);
  const handleFocus = () => commonInput.current.focus();

  return (
    <div className=' rounded bg-white mb-8 col-span-4 border mt-2 shadow'>
    <Header username={content.username}/>
    <img src={content.imageSrc}/>
    <Actions 
    content={content}
    docId={content.docId}
    totalLikes={content.likes.length}
    likedPhoto={content.userLikedPhotO}
    handleFocus={handleFocus}/>
    </div>
  )
}

export default Post