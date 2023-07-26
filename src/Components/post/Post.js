import React, { useEffect, useState } from "react";
import Header from "../header";
import useUser from '../../hooks/useuser';
import {createPost} from '../../services/firebase';
import { Navigate } from "react-router-dom";
import * as ROUTES from '../../constants/routes';
import { useNavigate } from "react-router-dom";

function Post() {
    const {user} = useUser();
    const [image,setImage] = useState(null);
    const [caption,setCaption] = useState('');
    const navigate = useNavigate();

    useEffect(() =>{
       console.log(user)
    },[])

    const handleUpload = async(e) =>{
        let res = await createPost(user[0].userId,image, caption,user[0].userId).then(() =>{
            navigate(ROUTES.DASHBOARD);
        })
    }
 
  return (
    <>
      <Header />
      <div className="w-full h-full grid place-items-center">
        <div className=" mt-10 flex flex-col gap-3">
          <div className=" w-full h-48 border-2 bg-gray-200 grid place-items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-12 h-12 cursor-pointer"
              onClick={() =>{
                let inp = document.getElementById('inp');
                inp.click();
              }}
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
              />
            </svg>
            <input type="file" accept="image/*" className=" hidden" id="inp" onChange={(e) => setImage(e.target.files[0])}/>
          </div>
          <div className="w-full flex flex-wrap items-center gap-4 justify-center">
            <input
              placeholder="Caption"
              className="flex-1 p-3 text-md border-2 outline-none"
              onChange={(e) => setCaption(e.target.value)}
            />
            <button className="bg-blue-500 p-2 rounded" onClick={handleUpload}>Create</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Post;
