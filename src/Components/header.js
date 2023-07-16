import React, { useContext } from "react";
import userContext from "../context/usercontext";
import * as ROUTES from "../constants/routes";
import { Link } from "react-router-dom";

function Header() {
  const {user} = useContext(userContext);

  console.log("user", user);
  return (
    <header className="w-full h-16 bg-slate-200 p-2">
      <div className="flex flex-wrap justify-around items-center">
        <div className="p-1">
          <Link to={ROUTES.DASHBOARD}>
            <img src={"/images/logo.png"} alt="logo"
             className="w-3/4" />
          </Link>
        </div>
        <div className=" flex gap-2">
            <Link to={ROUTES.DASHBOARD}>
                <li className=" list-none">HOME</li>
            </Link>
            <Link to={ROUTES.DASHBOARD}>
                <li className=" list-none">Services</li>
            </Link>
            <Link to={ROUTES.DASHBOARD}>
                <li className=" list-none">PROFILE</li>
            </Link>
        </div>
      </div>
    </header>
  );
}

export default Header;
