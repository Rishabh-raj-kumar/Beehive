import React, { useState } from 'react'
import { Link } from 'react-router-dom';

export default function SuggestedProfile({key,spDocId,profileId,username , userId, loggedInUserDocId }) {
    const [followed,setFollowed] = useState(false);

    async function handleFolloeUser(){
        setFollowed(true);

        await updateLoggedInUserFollowing(loggedInUserDocId,profileId);

        await updateFolllowedUserFollowers(spDocId, userId);
    }
  return !followed ? (
    <div className=' flex items-center justify-between flex-row m-3'>
        <div className='flex items-center justify-between'>
           <img className='rounded-full w-8 flex mr-3'
           src={`/images/avatars/${username}.jpg`}/>
           <Link to={`/p/${username}`}>
            <p className='font-bold text-sm'>{username}</p>
           </Link>
           </div>
           <div>
            <button onClick={() => console.log('follow this account')}
            >Follow</button>
        </div>
    </div>
  ) : null;
}
