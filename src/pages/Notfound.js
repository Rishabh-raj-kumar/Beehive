import React, { useEffect } from 'react'

function Notfound() {
  useEffect(() =>{
    document.title = "Not found";
  },[])
  
  return (
    <div>Notfound</div>
  )
}

export default Notfound