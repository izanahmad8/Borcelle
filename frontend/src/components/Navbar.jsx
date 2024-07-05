import React, { useState, useContext } from "react";
import { assets } from "../assets/assets";
import { Link, useNavigate } from "react-router-dom";
import { StoreContext } from "../context/StoreContext";
import { toast } from "react-toastify";

export default function Navbar({ setShowLogin }) {
  const navigate = useNavigate();
  const { getTotalCartAmount, token, setToken } = useContext(StoreContext);
  const [menu, setMenu] = useState("home");
  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/");
    toast.success("Logout successfull");
  };
  return (
    <div className="flex flex-col md:flex-row justify-between items-center py-5 px-4 md:px-0 max-lg:w-full">
      <Link to="/">
        <img
          className="w-44 max-w-full mb-4 md:mb-0"
          src={assets.logo}
          alt=""
        />
      </Link>
      <ul className="flex flex-col md:flex-row gap-5 text-[#49557e] list-none text-[18px] max-lg:text-[17px] mb-4 md:mb-0">
        <Link
          to="/"
          onClick={() => setMenu("home")}
          className={`cursor-pointer ${menu === "home" ? "active" : ""}`}
        >
          Home
        </Link>
        <a
          href="#menu"
          onClick={() => setMenu("menu")}
          className={`cursor-pointer ${menu === "menu" ? "active" : ""}`}
        >
          Menu
        </a>
        <a
          href="#mobile-app"
          onClick={() => setMenu("mobile-app")}
          className={`cursor-pointer ${menu === "mobile-app" ? "active" : ""}`}
        >
          Mobile App
        </a>
        <a
          href="#contact-us"
          onClick={() => setMenu("contact-us")}
          className={`cursor-pointer ${menu === "contact-us" ? "active" : ""}`}
        >
          Contact Us
        </a>
      </ul>
      <div className="flex items-center justify-center gap-6 max-lg:gap-8 md:justify-start">
        <img className="w-6 h-6 max-w-full" src={assets.search_icon} alt="" />
        <div className="relative cursor-pointer">
          <Link to="/cart">
            <img
              className="w-6 h-6 max-w-full"
              src={assets.basket_icon}
              alt=""
            />
          </Link>
          <div
            className={`${
              getTotalCartAmount()
                ? "animate-ping absolute top-[-8px] right-[-8px] w-2 h-2 bg-red-500 rounded-full"
                : ""
            }`}
          ></div>
        </div>
        {!token ? (
          <button
            className="bg-transparent text-[16px] text-[#49557e] cursor-pointer px-6 py-2 rounded-full border border-solid border-red-500 transition-[0.3s] hover:bg-[#fff4f2] max-lg:px-4 max-lg:py-2"
            onClick={() => setShowLogin(true)}
          >
            Sign in
          </button>
        ) : (
          <div className="relative profile">
            <img src={assets.profile_icon} alt="" />
            <ul className="absolute hidden right-0 z-[1] dropdown">
              <li onClick={() => navigate("/myorder")}>
                <img className="w-5" src={assets.bag_icon} alt="" />
                <p>Orders</p>
              </li>
              <hr className="border-black" />
              <li onClick={logout}>
                <img className="w-5" src={assets.logout_icon} alt="" />
                <p>Logout</p>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
