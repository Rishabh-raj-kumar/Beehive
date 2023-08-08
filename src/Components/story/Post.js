import React from 'react'

function Post({setPlay,play,followedUserImg,video}) {
  return (
    <div className=" w-full h-screen overflow-hidden absolute top-0 md:top-32 md:left-1/4 ">
      <div className="relative w-full h-full md:w-1/2 aspect-square md:aspect-video bg-blue-300 shadow-xl">
        <div
          className=" z-30 absolute top-3 right-4"
          onClick={() => setPlay(!play)}
        >
          <img
            width="20"
            height="20"
            src="https://img.icons8.com/ios-filled/50/close-window.png"
            alt="close-window"
          />
        </div>
        <div className="--status_user bg-gray-300 w-10 h-10 rounded-full absolute left-2 top-2 overflow-hidden">
          {followedUserImg && <img
            src={followedUserImg}
            className="w-10 h-10 object-cover"
          />}
        </div>
        <div className="w-full h-full grid place-items-center">
          <video autoPlay={true} className=" w-full h-auto">
            <source src={video} type="video/mp4" />
          </video>
        </div>
      </div>
    </div>
  )
}

export default Post