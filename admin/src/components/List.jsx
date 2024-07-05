import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export default function List({ url }) {
  const [list, setList] = useState([]);
  const fetchList = async () => {
    try {
      const response = await axios.get(`${url}/api/food/list`);
      if (response.data.success) {
        setList(response.data.data);
      } else {
        toast.error("Error on fetching");
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  const removeFood = async (foodId) => {
    try {
      const response = await axios.delete(`${url}/api/food/remove`, {
        data: { id: foodId },
      });
      await fetchList();
      if (response.data.success) {
        toast.success(response.data.message);
      } else {
        toast.error("Error on delete");
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="m-4 w-full">
      <p className="text-2xl font-bold mb-5">All Food List</p>
      <div className="text-[15px]">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-[0.5fr_1fr_1fr_1fr_1fr_0.5fr] items-center gap-[10px] p-[12px_15px] border border-solid border-[#cacaca] bg-[#f9f9f9]">
          <b>Image</b>
          <b>Name</b>
          <b>Description</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {list.map((item, index) => {
          return (
            <div
              key={index}
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-[0.5fr_1fr_1fr_1fr_1fr_0.5fr] items-center gap-[10px] p-[12px_15px] text-[15px] border border-solid border-[#cacaca]"
            >
              <img
                className="w-[50px]"
                src={`${url}/images/` + item.image}
                alt=""
              />
              <p>{item.name}</p>
              <p>{item.description}</p>
              <p>{item.category}</p>
              <p>&#8377;{item.price}</p>
              <p
                onClick={() => removeFood(item._id)}
                className="cursor-pointer"
              >
                X
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
