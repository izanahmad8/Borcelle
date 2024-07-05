import React from "react";

export default function Header() {
  return (
    <div className="h-[34vw] relative my-8 mx-auto bg-[url('/header_img.png')] bg-no-repeat bg-contain">
      <div
        className="absolute flex flex-col items-start gap-[1.5vw] max-w-[50%] bottom-[10%] left-[6vw]"
        style={{ animation: "fadeIn 3s" }}
      >
        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-medium text-white max-sm:text-sm">
          Order your favorite food here
        </h2>
        <p className="text-white text-[1vw] max-sm:text-[6px]">
          Choose from a diverse menu featuring a list of dishes crafted with the
          finest ingredients and culinary expertise. Our mission is to satisfy
          your craving and elevate your dining experience, one delicious meal at
          a time.
        </p>
        <button className="text-[#747474] font-medium bg-white py-[0.75vw] px-[1.5vw] max-sm:px-2 max-sm:py-1 max-sm:text-[8px] rounded-3xl">
          View menu
        </button>
      </div>
    </div>
  );
}
