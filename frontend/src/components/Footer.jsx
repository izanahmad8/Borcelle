import React from "react";
import { assets } from "../assets/assets";

export default function Footer() {
  return (
    <div
      className="text-[#d9d9d9] bg-[#323232] py-5 px-10 md:px-20 pt-20 mt-24"
      id="contact-us"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
        <div className="flex flex-col items-center gap-5">
          <img className="w-60 h-14" src={assets.logo} alt="logo" />
          <p className="text-center">
            Join our vibrant community of food enthusiasts and unlock exclusive
            perks, special offers, and loyalty rewards with every order. With
            our commitment to quality, reliability, and customer satisfaction,
            Borcelle Kitchen is your ultimate destination for culinary delights,
            delivered with care and precision.
          </p>
          <div className="flex gap-2 justify-center">
            <img
              className="w-8 h-8 rounded-[50%] hover:bg-[tomato]"
              src={assets.facebook_icon}
              alt="icon"
            />
            <img
              className="w-8 h-8 rounded-[50%] hover:bg-[tomato]"
              src={assets.twitter_icon}
              alt="icon"
            />
            <img
              className="w-8 h-8 rounded-[50%] hover:bg-[tomato]"
              src={assets.linkedin_icon}
              alt="icon"
            />
          </div>
        </div>
        <div className="flex flex-col items-center mt-12">
          <h2 className="text-xl font-semibold mb-2">COMPANY</h2>
          <ul className="text-center md:text-center">
            <li className="cursor-pointer mb-1 hover:text-[tomato]">Home</li>
            <li className="cursor-pointer mb-1 hover:text-[tomato]">
              About us
            </li>
            <li className="cursor-pointer mb-1 hover:text-[tomato]">
              Delivery
            </li>
            <li className="cursor-pointer mb-1 hover:text-[tomato]">
              Privacy & Policy
            </li>
          </ul>
        </div>
        <div className="flex flex-col items-center mt-12">
          <h2 className="text-xl font-semibold mb-2">GET IN TOUCH</h2>
          <ul className="text-center md:text-center">
            <li className="cursor-pointer mb-1">+91-6200567564</li>
            <li className="cursor-pointer mb-1">izan.khan596@gmail.com</li>
          </ul>
        </div>
      </div>
      <hr className="w-full h-[2px] my-5 bg-[grey] border-none" />
      <p className="text-center text-sm md:text-center">
        Copyright 2024 &copy; IzanAhmad - All Rights Reserved.
      </p>
    </div>
  );
}
