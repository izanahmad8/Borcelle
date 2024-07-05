import React, { useState } from "react";
import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Cart from "./components/Cart";
import PlaceOrder from "./components/PlaceOrder";
import Footer from "./components/Footer";
import Login from "./components/Login";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Orders from "./components/Orders";

const App = () => {
  const [showLogin, setShowLogin] = useState(false);
  return (
    <>
      {showLogin ? <Login setShowLogin={setShowLogin} /> : <></>}
      <div className="w-[80%] m-auto">
        <Navbar setShowLogin={setShowLogin} />
        <ToastContainer />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/placeorder" element={<PlaceOrder />} />
          <Route path="/myorder" element={<Orders />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
};

export default App;
