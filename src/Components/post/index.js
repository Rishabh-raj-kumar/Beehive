import React, { useRef } from 'react'
import Header from './header'
import Actions from './actions'
import Footer from './Footer';
import Comments from './comments';

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