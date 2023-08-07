import React, { useEffect, useState } from "react";
import Header from "../header";
import useUser from "../../hooks/useuser";
import { createPost } from "../../services/firebase";
import { Navigate } from "react-router-dom";
import * as ROUTES from "../../constants/routes";
import { useNavigate } from "react-router-dom";
import Loader from "../Loader";

function Post() {
  const { user } = useUser();
  const [image, setImage] = useState(null);
  const [caption, setCaption] = useState("");
  const navigate = useNavigate();
  const [CurrUser,setCurrUser] =  useState(null);
  const [loading,setLoading] = useState(false);


  useEffect(() =>{
      try{
           if(user){
              setCurrUser(user[0]);
           }
      }catch(err){
        console.log(err);
      }
  },[user])

  const handleUpload = async (e) => {
    setLoading(true)
    let res = await createPost(
      user[0].userId,
      image,
      caption,
      user[0].userId
    ).then(() => {
      setLoading(false);
      navigate(ROUTES.DASHBOARD);
    });
  };

  return (
    <>{loading ? (<>
    <Loader/>
    </>) :(
    <>
      <Header />
      <div className="w-full h-full grid place-items-center">
        <div className=" bg-white w-full md:w-3/4 mt-10 flex flex-col gap-3">
          <div className="flex justify-between p-3">
            <div className="flex h-9 items-center gap-2 ml-3 p-2">
              {CurrUser && <img
                src={CurrUser.image ? CurrUser.image : null}
                alt="user"
                className="w-9 h-9 rounded-full"
              />}
              {CurrUser && <p>{CurrUser.username}</p>}
            </div>
            <button
              className="bg-blue-600 text-white px-4 rounded"
              onClick={handleUpload}
            >
              Post
            </button>
          </div>
          <div className=" relative w-full  border-2 bg-white grid place-items-center">
            <div className="w-full flex flex-wrap items-center gap-4 justify-center">
              <textarea
                placeholder="What's On Your Mind?"
                className=" w-3/4 flex-1 p-3 text-md outline-none"
                onChange={(e) => setCaption(e.target.value)}
              />
               <svg
              width="30px"
              height="30px"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className=" mr-2"
              onClick={() => {
                let inp = document.getElementById("inp");
                inp.click();
              }}
            >
              <path
                d="M7 11C8.10457 11 9 10.1046 9 9C9 7.89543 8.10457 7 7 7C5.89543 7 5 7.89543 5 9C5 10.1046 5.89543 11 7 11Z"
                stroke="#000000"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M5.56055 21C11.1305 11.1 15.7605 9.35991 21.0005 15.7899"
                stroke="#000000"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M14.35 3H5C3.93913 3 2.92172 3.42136 2.17157 4.17151C1.42142 4.92165 1 5.93913 1 7V17C1 18.0609 1.42142 19.0782 2.17157 19.8284C2.92172 20.5785 3.93913 21 5 21H17C18.0609 21 19.0783 20.5785 19.8284 19.8284C20.5786 19.0782 21 18.0609 21 17V9"
                stroke="#000000"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M22.3098 3.16996L17.2098 8.26005C16.7098 8.77005 15.2098 8.99996 14.8698 8.66996C14.5298 8.33996 14.7598 6.82999 15.2698 6.31999L20.3599 1.23002C20.6171 0.964804 20.9692 0.812673 21.3386 0.807047C21.7081 0.80142 22.0646 0.942731 22.3298 1.19999C22.5951 1.45725 22.7472 1.8093 22.7529 2.17875C22.7585 2.5482 22.6171 2.90475 22.3599 3.16996H22.3098Z"
                stroke="#000000"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            </div>
             <img className=" w-full h-52 object-cover p-2" id="preview" />
            <input
              type="file"
              accept="image/*"
              className=" hidden"
              id="inp"
              onChange={(e) => {
                setImage(e.target.files[0]);
                let file = e.target.files[0];
                let previewEle = document.getElementById("preview");
                const url = URL.createObjectURL(file);
                previewEle.src = url;
              }}
            />
          </div>
        </div>
      </div>
    </>)}
    </>
  );
}

export default Post;
