import React, { useEffect, useState } from 'react'
import UserSuggested from './UserSuggested';
function UserPresent({user}) {
    const [Users,setUser] = useState([]);

    useEffect(() =>{
       try{
         setUser(user[0].following);
       }catch(err){
        console.log(err)
       }
    },[user])
  return (
    <div className='flex md:flex-col'>{
        Users.map((x) =>(
            <div>
                <UserSuggested
                  userId={x}
                />
            </div>
        ))
    }</div>
  )
}

export default UserPresent