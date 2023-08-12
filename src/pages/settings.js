import React, { useEffect, useState } from "react";
import * as ROUTES from "../constants/routes";
import useUser from "../hooks/useuser";
import { Link } from "react-router-dom";

function Settings() {
  const [name, setName] = useState(null);
  const { user } = useUser();

  useEffect(() => {
    try {
      if (user) {
        setName(user[0].username);
      }
    } catch (err) {
      console.log(err);
    }
  }, [user]);
  return (
    <div className=" w-full flex flex-col">
      <Link to={`/p/${name}`}>
        <div className=" border-b-2 p-2 flex gap-2 items-center">
          <div className=" w-14 h-14 bg-sky-300 grid place-items-center">
            <img src={"/images/icons/prof_image.svg"} />
          </div>
          <p className="text-xl font-poppins">Profile</p>
        </div>
      </Link>
      <Link to={ROUTES.forgotPass}>
        <div className=" border-b-2 p-2 flex gap-2 items-center">
          <div className=" w-14 h-14 bg-pink-200 grid place-items-center">
            <svg
              width="25px"
              height="25px"
              viewBox="0 0 15 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12.5 8.5V7.5C12.5 6.94772 12.0523 6.5 11.5 6.5H1.5C0.947715 6.5 0.5 6.94772 0.5 7.5V13.5C0.5 14.0523 0.947715 14.5 1.5 14.5H11.5C12.0523 14.5 12.5 14.0523 12.5 13.5V12.5M12.5 8.5H8.5C7.39543 8.5 6.5 9.39543 6.5 10.5C6.5 11.6046 7.39543 12.5 8.5 12.5H12.5M12.5 8.5C13.6046 8.5 14.5 9.39543 14.5 10.5C14.5 11.6046 13.6046 12.5 12.5 12.5M3.5 6.5V3.5C3.5 1.84315 4.84315 0.5 6.5 0.5C8.15685 0.5 9.5 1.84315 9.5 3.5V6.5M12 10.5H13M10 10.5H11M8 10.5H9"
                stroke="#000000"
              />
            </svg>
          </div>
          <p className="text-xl font-poppins">Forgot Password</p>
        </div>
      </Link>
      <Link to={ROUTES.news}>
        <div className=" border-b-2 p-2 flex gap-2 items-center">
          <div className=" w-14 h-14 bg-green-200 grid place-items-center">
            <img src={'/images/icons/news.svg'}/>
          </div>
          <p className="text-xl font-poppins"> Today's News</p>
        </div>
      </Link>
      <Link to={ROUTES.help}>
        <div className=" border-b-2 p-2 flex gap-2 items-center">
          <div className=" w-14 h-14 bg-orange-200 grid place-items-center">
            <img src={'/images/icons/help.svg'}/>
          </div>
          <p className="text-xl font-poppins"> Help </p>
        </div>
      </Link>
      <Link to={ROUTES.aboutAuthor}>
        <div className=" border-b-2 p-2 flex gap-2 items-center">
          <div className=" w-14 h-14 bg-purple-300 grid place-items-center">
            <img src={'/images/icons/about.svg'}/>
          </div>
          <p className="text-xl font-poppins"> About Author </p>
        </div>
      </Link>
    </div>
  );
}

export default Settings;
