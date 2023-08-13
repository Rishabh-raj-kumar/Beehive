import React, { useContext, useEffect, useState } from "react";
import useUser from "../hooks/useuser";
import { tellMeYourself } from "../services/firebase";
import { Navigate, useNavigate } from "react-router-dom";
import * as ROUTES from "../constants/routes";

function WalkThrough() {
    const navigate = useNavigate();
  const { user } = useUser();
  const [description, setDescription] = useState("");
  const [preImg, setPreImg] = useState(null);
  const [image, setImage] = useState(null);
  const [loader,setLoader] = useState(false)

  useEffect(() => {
    // console.log(user);
    try {
      if (user) {
        setPreImg(user[0].image);
      }
    } catch (err) {
      console.log(err);
    }
  }, [user]);

  const handleChange = async () => {
    try {
      if (image) {
        setLoader(true)
        let res = await tellMeYourself(user[0].docId,user[0].userId, image, description);
        setLoader(false)
        navigate(`${ROUTES.DASHBOARD}`);
      }else{
        alert('Please add profile photo');
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    try{
        if(image){
    // create the preview
    const objectUrl = URL.createObjectURL(image);
    setPreImg(objectUrl);
        }
    }catch(err){
        console.log(err);
    }
  },[image]);

  return (
    <div className="w-full h-screen grid place-items-center">
      <div className="  delay-100 transition-all shadow-2xl w-full md:max-w-md m-2 flex flex-col items-center bg-white p-3 gap-2 justify-center">
        <div className="relative">
          <img
            src={preImg}
            alt="user Image"
            className="w-20 h-20 rounded-full"
          />

          <svg
            width="40px"
            height="40px"
            viewBox="0 0 1024 1024"
            class="icon"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            className="absolute -bottom-2 right-0"
            onClick={() => {
              let inp = document.getElementById("file");
              inp.click();
            }}
          >
            <path
              d="M853.333333 874.666667H170.666667c-46.933333 0-85.333333-38.4-85.333334-85.333334V234.666667c0-46.933333 38.4-85.333333 85.333334-85.333334h682.666666c46.933333 0 85.333333 38.4 85.333334 85.333334v554.666666c0 46.933333-38.4 85.333333-85.333334 85.333334z"
              fill="#8CBCD6"
            />
            <path
              d="M746.666667 341.333333m-64 0a64 64 0 1 0 128 0 64 64 0 1 0-128 0Z"
              fill="#B3DDF5"
            />
            <path
              d="M426.666667 341.333333L192 682.666667h469.333333z"
              fill="#9AC9E3"
            />
            <path
              d="M661.333333 469.333333l-170.666666 213.333334h341.333333z"
              fill="#B3DDF5"
            />
            <path
              d="M810.666667 810.666667m-213.333334 0a213.333333 213.333333 0 1 0 426.666667 0 213.333333 213.333333 0 1 0-426.666667 0Z"
              fill="#43A047"
            />
            <path
              d="M768 682.666667h85.333333v256h-85.333333z"
              fill="#FFFFFF"
            />
            <path
              d="M682.666667 768h256v85.333333H682.666667z"
              fill="#FFFFFF"
            />
          </svg>
          <input
            type="file"
            className="hidden"
            id="file"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </div>
        <textarea
          rows={5}
          placeholder="Tell Me About Yourself"
          className="w-full bg-gray-100 p-2 rounded text-lg outline-none border-none"
          onChange={(e) => setDescription(e.target.value)}
        />
        <button
          disabled={description.length < 5}
          className={`px-4 bg-blue-800 text-white p-1 rounded ${
            description.length < 5 ? "opacity-50" : "opacity-100"
          }`}
          onClick={handleChange}
        >
          Let's Rock
        </button>
      </div>
    </div>
  );
}

export default WalkThrough;
