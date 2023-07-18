import React from 'react'
import Header from '../Components/header'
import Timeline from '../Components/timeline'
import Sidebar from '../Components/sidebar/sidebar'

function Dashboard() {
  return (
    <>
    <Header />
    <div className='grid grid-cols-3 gap-4 justify-between mx-auto max-w-screen-lg'>
    <Timeline/>
    <Sidebar/>
    </div>
    </>
  )
}

export default Dashboard