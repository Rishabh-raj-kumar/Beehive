import React from 'react'
import Header from '../Components/header'
import Timeline from '../Components/timeline'
import Sidebar from '../Components/sidebar/sidebar'
import { useMediaQuery } from 'react-responsive'
import Footer from '../Components/footer'
import usePhotos from '../hooks/usePhotos';

function Dashboard() {
  const { photos } = usePhotos();
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 770px)' })
  return (
    <>
    <Header />
    <div className={`grid ${!isTabletOrMobile && `grid-cols-3`} gap-4 justify-between mx-auto max-w-screen-lg`}>
    <Timeline photos={photos}/>
    {!isTabletOrMobile && <Sidebar photos={photos}/>}
    {isTabletOrMobile && <Footer/>}
    </div>
    </>
  )
}

export default Dashboard