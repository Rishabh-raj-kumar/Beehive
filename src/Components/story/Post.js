import React from 'react'
import usePhotos from '../../hooks/useStory'

function Post() {
  const {photos} =usePhotos();
  console.log(photos)
  return (
    <div>Post</div>
  )
}

export default Post