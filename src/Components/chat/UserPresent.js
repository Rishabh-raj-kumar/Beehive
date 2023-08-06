import React, { useEffect, useState } from 'react'
import UserSuggested from './UserSuggested';
function UserPresent({user}) {
    const [Users,setUser] = useState([]);

    useEffect(() =>{
       try{
        if(user[0].suggestions){
         setUser(user[0].suggestions);
        }
       }catch(err){
        console.log(err)
       }
    },[user])
  return (
    <div className='flex md:flex-col'>{
        Users.map((x) =>(
            <div>
                <UserSuggested
                CurrUser={user}
                  userId={x}
                />
            </div>
        ))
    }</div>
  )
}

export default UserPresent