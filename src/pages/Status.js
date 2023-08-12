import React, { useEffect, useState } from "react";
import Header from "../Components/header";
import useUser from "../hooks/useuser";
import { createStory } from "../services/firebase";
import { Navigate } from "react-router-dom";
import * as ROUTES from "../constants/routes";
import { useNavigate } from "react-router-dom";
import Loader from "../Components/Loader";

function Status() {
  const { user } = useUser();
  const [video, setVideo] = useState(null);
  const [videoUrl, setVideoUrl] = useState("");
  const navigate = useNavigate();
  const [CurrUser, setCurrUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [preview,setPreview] = useState(false);

  useEffect(() => {
    try {
      if (user) {
        setCurrUser(user[0]);
      }
    } catch (err) {
      console.log(err);
    }
  }, [user]);

  const handleUpload = async (e) => {
    try {
      if(!video){
        return;
      }
      setLoading(true);
      await createStory(user[0].userId, video, setVideoUrl, videoUrl,setLoading)
      setPreview(false);
      setVideo(null)
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {loading ? (
        <>
          <Loader />
        </>
      ) : (
        <>
          <Header />
          <div className="w-full h-full grid place-items-center">
            <div className=" bg-white w-full md:w-1/2 mt-10 flex flex-col gap-3">
              <div className="flex justify-between p-3">
                <div className="flex h-9 items-center gap-2 ml-3 p-2">
                  {CurrUser && (
                    <img
                      src={CurrUser.image ? CurrUser.image : null}
                      alt="user"
                      className="w-9 h-9 rounded-full"
                    />
                  )}
                  {CurrUser && <p>{CurrUser.username}</p>}
                </div>
                <div className=" flex gap-3">
                  <button
                    className=" border-2 border-black flex items-center gap-2 rounded-xl p-2"
                    onClick={() => {
                      let inp = document.getElementById("inp");
                      inp.click();
                    }}
                  >
                    {" "}
                    Choose
                    <img
                      width="20"
                      height="20"
                      src="https://img.icons8.com/ios-filled/30/video.png"
                      alt="video"
                    />
                  </button>
                  <button
                    className=" shadow-lg shadow-blue-400 bg-blue-600 rounded-xl text-white font-bold px-4"
                    onClick={handleUpload}
                  >
                    Upload
                  </button>
                </div>
              </div>
              <div className=" relative w-full  border-2 bg-white grid place-items-center">
                {preview ? (<video
                  className=" w-full h-96 border-1"
                  id="video-tag"
                  autoPlay={true}
                >
                  <source id="preview" type="video/mp4" />
                </video>) : (<>
                <div className=" grid place-items-center w-full h-96 border-1">
                     <div className=" p-4">
                      <p className=" text-lg font-medium">Your uploaded status Preview will be shown here.</p>
                      <p className=" mt-4"><span className=" text-lg font-semibold">Note : </span>
                      We have limited storage and functionality so please delete the status by your own,
                      after 24 hour or anytime you want. It will not be deleted automatic.
                      </p>
                      <p className=" mt-4"><span className=" text-lg font-semibold">Note : </span>
                       Because our servers are not that fast, wait for few minutes,
                       Be pateint while status will be uploaded.
                      </p>
                     </div>
                </div>
                </>)}
                <input
                  type="file"
                  accept="video/*"
                  className=" hidden"
                  id="inp"
                  onChange={(event) => {
                    setPreview(true)
                    setTimeout(() => {
                    const videoTag = document.querySelector("#video-tag");
                    const cond = event.target.files[0].size < 8000000;
                    // console.log(event.target.files[0].size)
                    setVideo(event.target.files[0]);
                    if (event.target.files && event.target.files[0] && cond) {
                      var reader = new FileReader();

                      reader.onload = function (e) {
                        document.getElementById("preview").src =
                          e.target.result;
                        videoTag.load();
                      }.bind(this);

                      reader.readAsDataURL(event.target.files[0]);
                    } else if (!cond) {
                      alert(`File size must be less than or equal to 8mb`);
                    }
                  }, 200);
                  }}
                />
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default Status;
