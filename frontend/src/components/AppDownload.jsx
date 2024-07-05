import React from "react";
import { assets } from "../assets/assets";

export default function AppDownload() {
  return (
    <div
      className="m-auto mt-24 text-center text-[max(3vw,20px)] font-medium"
      id="mobile-app"
    >
      <p>
        For Better Experience Download our App <br /> Borcelle Kitchen
      </p>
      <div className=" flex justify-center mt-10 gap-[max(2vw,10px)]">
        <img
          className="w-[max(30vw,120px)] max-w-[180px] transition-[0.5s] cursor-pointer hover:scale-105"
          src={assets.play_store}
          alt="play_store"
        />
        <img
          className="w-[max(30vw,120px)] max-w-[180px] transition-[0.5s] cursor-pointer hover:scale-105"
          src={assets.app_store}
          alt="app_store"
        />
      </div>
    </div>
  );
}
