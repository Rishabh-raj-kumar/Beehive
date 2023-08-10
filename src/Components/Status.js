import React, { useEffect, useState } from "react";
import useStory from "../hooks/useStory";
import Skeleton from "react-loading-skeleton";

function Story({ setPlay, setVideo, setfollowedImg }) {
  const { story,followedUser } = useStory();
  const [userStory, setUserStory] = useState([]);
  const [userImg, setUserImg] = useState("");

  useEffect(() =>{
          try{
            if(story){
              // console.log(followedUser[0].user[0].image)
              // setUserImg(followedUser[0].image)
              setUserStory(story);
            }
          }catch(err){
            console.log(err);
          }
  },[story])

  return (
    <>
    {story ? (
    <div className=" status-container flex  w-full md:w-full overflow-hidden p-5">
      {console.log(userStory)}
        {story.map((x,index) => (
        <>
        {/* {console.log(followedUser[index].user[0].image)} */}
        {x.video ? (<div className=" mt-2 flex gap-2 overflow-y-scroll">
          <div
            className="ml-2 relative flex-shrink-0 w-24 h-32 bg-white  rounded-[25px] shadow-xl"
            style={{backgroundColor: '#FFE87C'}}
            onClick={() => {
              setPlay(true);
              setVideo(x.video);
              setfollowedImg(followedUser[index].user[0].image)
            }}
            key={x.userId}
          >
            <div className="--status_user bg-gray-300 w-10 h-10 rounded-full absolute left-2 top-2 overflow-hidden">
              <img
                src={followedUser[index].user[0].image}
                className="w-10 h-10 object-cover"
              />
            </div>
            <div className="w-full h-32">
              {x.video && (
                <video autoPlay={false} className=" w-full h-32">
                  <source src={x.video} type="video/mp4" />
                </video>
              )}
            </div>
          </div>
        </div>) : (
          <Skeleton count={1} width={98} height={128}/>
        )}
        </>
      ))}
    </div>) : (
      <>
      <Skeleton count={1} width={98} height={128}/>
      </>
    )}
    </>
  );
}

export default Story;
