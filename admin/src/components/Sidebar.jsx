import React from "react";
import assets from "../assets/assets";
import { NavLink } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="w-[18%] min-h-[100vh] border-[#a9a9a9] border-[1.5px] border-solid border-t-0 text-[max(1vw,10px)]">
      <div className="flex flex-col gap-5 pt-[50px] pl-[20%]">
        <NavLink
          to="/add"
          className="flex items-center gap-3 border-[1px] border-solid border-[#a9a9a9] border-r-0 p-[8px_10px] rounded-[3px_0px_0px_3px] cursor-pointer"
        >
          <img src={assets.add_icon} alt="" />
          <p className="hidden sm:block">Add Items</p>
        </NavLink>
        <NavLink
          to="/list"
          className="flex items-center gap-3 border-[1px] border-solid border-[#a9a9a9] border-r-0 p-[8px_10px] rounded-[3px_0px_0px_3px] cursor-pointer"
        >
          <img className="w-7 h-7" src={assets.List_icon} alt="" />
          <p className="hidden sm:block">List Items</p>
        </NavLink>
        <NavLink
          to="/orders"
          className="flex items-center gap-3 border-[1px] border-solid border-[#a9a9a9] border-r-0 p-[8px_10px] rounded-[3px_0px_0px_3px] cursor-pointer"
        >
          <img src={assets.order_icon} alt="" />
          <p className="hidden sm:block">Orders</p>
        </NavLink>
      </div>
    </div>
  );
}
