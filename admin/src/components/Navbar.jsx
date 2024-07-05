import React from "react";
import assets from "../assets/assets";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="flex justify-between items-center p-[8px_4%]">
      <Link to="/">
        <img className="w-44 max-w-full" src={assets.logo} alt="" />
      </Link>
      <img className="w-[40px]" src={assets.profile_image} alt="" />
    </div>
  );
}
