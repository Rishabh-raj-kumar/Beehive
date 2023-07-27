import React from 'react'
import Skeleton from 'react-loading-skeleton';
import Post from './post/index';

function Timeline({photos}) {
  
  return (
    <div className='container col-span-2'>
      {/** firstly we will create a skeleton map if photo does not fetched... */}
     {
      !photos ? (
        <>
        {[...new Array(4)].map((_,index)=>(
          <Skeleton count={1} key={index} width={400} height={300}
          className=' mb-5'/>
        ))}
        </>
      ) : photos.length > 0 ? (
          photos.map((content) =>(
            <>
            <Post key={content.docId} content={content}/>
            </>
          ))
      ) : (
        <>
        {/** telling user to follow for viewing posts */}
        <p>Follow users for more...</p>
        </>
      )
     }
    </div>
  )
}

export default Timeline