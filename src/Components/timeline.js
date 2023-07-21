import React from 'react'
import usePhotos from '../hooks/usePhotos'

function Timeline() {
  const { photos } = usePhotos();
  return (
    <div className='container col-span-2'>
     <h1>Timeline</h1>
    </div>
  )
}

export default Timeline