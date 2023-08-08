import React, { useEffect, useState } from "react";
import Header from "../Components/header";
import Timeline from "../Components/timeline";
import Sidebar from "../Components/sidebar/sidebar";
import { useMediaQuery } from "react-responsive";
import Footer from "../Components/footer";
import usePhotos from "../hooks/usePhotos";
import Story from "../Components/Status";
import Post from "../Components/story/Post";
import Navigation from "../Components/Navigation";

function Dashboard() {
  const { photos } = usePhotos();
  const [play, setPlay] = useState(false);
  const [video,setVideo] = useState(null);
  const [followedUserImg,setfollowedImg] = useState(null);
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 770px)" });


  return (
    <>
      <div className={`relative ${play && 'overflow-hidden'} bg-zinc-950`}>
        <Header />
        <div
          className={`grid ${!isTabletOrMobile && `grid-cols-4`} ${
            isTabletOrMobile && `grid-cols-1`
          } gap-3 justify-between mx-auto max-w-screen-lg`}
        >
          <Navigation/>
          <div className="col-span-2">
            <Story setPlay={setPlay} setVideo={setVideo} setfollowedImg={setfollowedImg} />
            <Timeline photos={photos} />
          </div>
          {!isTabletOrMobile && <Sidebar photos={photos} />}
          {isTabletOrMobile && <Footer />}
        </div>
        {/** we will be playing status */}
        {play && <Post setPlay={setPlay} play={play} followedUserImg={followedUserImg}
        video={video}/>}
      </div>
    </>
  );
}

export default Dashboard;
