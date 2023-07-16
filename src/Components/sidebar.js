import React from 'react'
import useUser  from '../hooks/useuser';

function Sidebar() {
  const x = useUser();

  console.log('x',x.user[0].fullname);
  return (
    <div>Sidebar</div>
  )
}

export default Sidebar