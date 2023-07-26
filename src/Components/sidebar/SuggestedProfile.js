import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import {updateFolllowedUserFollowers,updateLoggedInUserFollowing} from '../../services/firebase';

export default function SuggestedProfile({key,spDocId,profileId,username , userId, loggedInUserDocId }) {
    const [followed,setFollowed] = useState(false);

    async function handleFollowUser(){
        setFollowed(true);

        //firsly update following
        const res = await updateLoggedInUserFollowing(loggedInUserDocId,profileId,false);
        if(res !== '' || res !== null){
          alert('followed user');
          location.reload();
        }

        //then update follwing person follower count.
        await updateFolllowedUserFollowers(spDocId, userId, false);
    }
  return !followed ? (
    <div key={key} className=' flex w-full items-center justify-between flex-row m-3 bg-white shadow p-3 px-5'>
        <div className='flex items-center justify-between object-cover'>
           <img className='rounded-full w-8 flex mr-3 object-cover'
           src={`/images/avatars/${username}.jpg`}/>
           <Link to={`/p/${username}`}>
            <p className='font-bold text-sm'>{username}</p>
           </Link>
           </div>
           <div>
            <button className=' bg-blue-600 p-1 px-2 rounded text-white' 
            onClick={handleFollowUser}
            >Follow</button>
        </div>
    </div>
  ) : null;
}
