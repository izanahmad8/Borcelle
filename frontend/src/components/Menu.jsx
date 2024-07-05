import React from "react";
import { menu_list } from "../assets/assets";

export default function Menu({ category, setCategory }) {
  return (
    <div className="flex flex-col gap-5" id="menu">
      <h1 className="text-4xl font-medium text-[#262626] max-sm:text-center max-sm:m-auto">
        Explore our menu
      </h1>
      <p className="max-w-[60%] text-[#808080] max-sm:text-center max-sm:m-auto">
        Choose from a diverse menu featuring a list of dishes. Our mission is to
        satify your craving and elevate your dining experience, one delicious
        meal at a time.
      </p>
      <div
        id="menu"
        className="flex justify-between items-center gap-[30px] text-center my-5 mx-0 overflow-x-scroll"
      >
        {menu_list.map((item, index) => {
          return (
            <div
              onClick={() =>
                setCategory((prev) =>
                  prev === item.menu_name ? "All" : item.menu_name
                )
              }
              key={index}
            >
              <img
                className={`w-[7.5vw] min-w-20 cursor-pointer rounded-[50%] transition-[0.2s] ${
                  category === item.menu_name ? "highlight" : ""
                }`}
                src={item.menu_image}
                alt={item.menu_name}
              />
              <p className="text-[#747474] mt-2 text-[max(1.4vw,16px)] cursor-pointer">
                {item.menu_name}
              </p>
            </div>
          );
        })}
      </div>
      <hr className="bg-[#e2e2e2] my-2 mx-0 h-[2px] border-none" />
    </div>
  );
}
