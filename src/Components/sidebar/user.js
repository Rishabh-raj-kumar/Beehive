import React from 'react'

function User({ fullname, username}) {
  return (
    <div>
      <h1>{username}</h1>
      <h2>{fullname}</h2>
    </div>
  )
}

export default User;