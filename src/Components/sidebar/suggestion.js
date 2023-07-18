import React, { useEffect, useState } from 'react'
import Skeleton  from "react-loading-skeleton";
import {getSuggestedProfiles} from '../../services/firebase';

function Suggestions({ userId }) {
    const [profile,setProfile] = useState('');

    useEffect(() => {
          async function suggestedProfile(){
            const responce = await getSuggestedProfiles(userId);
            setProfile(responce);
          }

          if(userId){
            suggestedProfile();
          }
    },[userId])
  return !profile ? (
    <Skeleton count={2} height={100} className="mt-5" />
  ) : profile.length > 0 (
      <div className='rounded flex flex-col'>
        <div className='flex items-center justify-between mb-2'>
            <p>suggestions for you.</p>
        </div>
      </div>
  )
}

export default Suggestions;