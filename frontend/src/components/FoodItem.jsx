import { assets } from "../assets/assets";
import { useContext } from "react";
import { StoreContext } from "../context/StoreContext";

export default function FoodItem({ id, name, description, price, image }) {
  const { cart, addToCart, removeFromCart, url } = useContext(StoreContext);
  return (
    <div
      className="w-full rounded-xl m-auto shadow-xl transition-[0.3s] "
      style={{ animation: "fadeIn 3s" }}
    >
      <div className="relative">
        <img
          className="w-full"
          style={{ borderRadius: "15px 15px 0px 0px" }}
          src={url + "/images/" + image}
          alt="image"
        />
        {!cart[id] ? (
          <img
            className="absolute bottom-[15px] right-[15px] w-9 cursor-pointer rounded-[50%] "
            onClick={() => addToCart(id)}
            src={assets.add_icon_white}
            alt="icon"
          />
        ) : (
          <div className="absolute bottom-[15px] right-[15px] flex items-center gap-2 rounded-[50px] p-2 bg-white">
            <img
              className="w-7 cursor-pointer rounded-[50%]"
              onClick={() => removeFromCart(id)}
              src={assets.remove_icon_red}
              alt="icon"
            />
            <p>{cart[id]}</p>
            <img
              className="w-7 cursor-pointer rounded-[50%]"
              onClick={() => addToCart(id)}
              src={assets.add_icon_green}
              alt="icon"
            />
          </div>
        )}
      </div>
      <div className="p-5">
        <div className="flex justify-between items-center mb-3">
          <p className="text-[18px] font-medium">{name}</p>
          <img className="w-[70px]" src={assets.rating_starts} alt="" />
        </div>
        <p className="text-[#676767] text-[12px]">{description}</p>
        <p className="text-[tomato] font-medium text-[22px] my-2 mx-0">
          &#8377; {price}
        </p>
      </div>
    </div>
  );
}
