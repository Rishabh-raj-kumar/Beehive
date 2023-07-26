import React from 'react'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import { Link } from 'react-router-dom';
export default function User({ fullname, username,image}){
  return !username || !fullname ? (
    <Skeleton count={2} height={30} width={100}/>
  ) : (
     <Link to={`/p/${username}`} className="grid grid-cols-4 gap-4 mb-6">
      <div className='flex items-center justify-between col-span-1'>
         <img className='w-16 rounded-full mr-3' 
         src={image ? `${image}` :`https://api.multiavatar.com/Binx Bond.svg`} />
      </div>
      <div className='col-span-3'>
      <p>{username}</p>
      <p>{fullname}</p>
      </div>
      </Link>
  )
  }