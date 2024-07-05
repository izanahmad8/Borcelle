import React, { useContext } from "react";
import { StoreContext } from "../context/StoreContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Cart() {
  const { food_list, removeFromCart, cart, getTotalCartAmount, url, token } =
    useContext(StoreContext);
  const navigate = useNavigate();
  const handleClick = () => {
    if (token && getTotalCartAmount() > 0) {
      navigate("/placeorder");
    }
    if (!token) {
      navigate("/cart");
      toast.error("Please login first");
    } else if (getTotalCartAmount() === 0) {
      navigate("/cart");
      toast.error("your cart is empty");
    }
  };
  return (
    <div className="mt-24">
      <div>
        <div className="grid grid-cols-[1fr_1.5fr_1fr_1fr_1fr_0.5fr] items-center text-[grey] text-[max(1vw,12px)]">
          <p>Item</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
        {food_list.map((item, index) => {
          if (cart[item._id] > 0) {
            return (
              <div key={index}>
                <div className="grid grid-cols-[1fr_1.5fr_1fr_1fr_1fr_0.5fr] items-center text-black text-[max(1vw,12px)] mx-0 my-3">
                  <img
                    className="w-12"
                    src={url + "/images/" + item.image}
                    alt=""
                  />
                  <p>{item.name}</p>
                  <p>&#8377; {item.price}</p>
                  <p>{cart[item._id]}</p>
                  <p>&#8377; {item.price * cart[item._id]}</p>
                  <p
                    onClick={() => removeFromCart(item._id)}
                    className="cursor-pointer"
                  >
                    X
                  </p>
                </div>
                <hr className="h-[1px] bg-[#e2e2e2] border-none" />
              </div>
            );
          }
        })}
      </div>
      <div className="mt-20 flex flex-col lg:flex-row justify-between gap-[max(12vw,20px)]">
        <div className="flex-[1] flex flex-col gap-5">
          <h2 className="text-2xl font-bold">Cart Total</h2>
          <div className="flex justify-between text-[#555]">
            <p>Subtotal</p>
            <p>&#8377;{getTotalCartAmount()}</p>
          </div>
          <hr />
          <div className="flex justify-between text-[#555]">
            <p>Delivery fee</p>
            <p>&#8377;{getTotalCartAmount() ? 40 : 0}</p>
          </div>
          <hr />
          <div className="flex justify-between text-[#555]">
            <p>Total</p>
            <p>&#8377;{getTotalCartAmount() ? getTotalCartAmount() + 40 : 0}</p>
          </div>
          <button
            onClick={handleClick}
            className="bg-[tomato] rounded text-white w-[max(15vw,200px)] p-2 hover:bg-[#fa4b2c]"
          >
            Proceed to checkout
          </button>
        </div>
        <div className="flex-[1] mt-8 lg:mt-0">
          <p className="text-[#555]">Have a promo code?</p>
          <div className="mt-2 flex flex-col sm:flex-row justify-between items-center bg-[#eaeaea] rounded">
            <input
              className="p-2 w-full bg-transparent sm:flex-1 outline-none rounded-sm mb-2 sm:mb-0 sm:mr-2"
              type="text"
              placeholder="Enter your code"
            />
            <button className="bg-black rounded text-white px-[20px] py-[8px] w-full sm:w-auto">
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
