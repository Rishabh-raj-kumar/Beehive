import React from 'react'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import { Link } from 'react-router-dom';
const User = ({ fullname, username}) => 
  !username || !fullname ? (
    <Skeleton count={2} height={30} width={100}/>
  ) : (
     <Link to={`/p/${username}`} className="grid">
      <p>{username}</p>
      </Link>
  )

export default User;