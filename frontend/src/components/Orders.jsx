import axios from "axios";
import { useContext, useState, useEffect } from "react";
import { StoreContext } from "../context/StoreContext";
import { assets } from "../assets/assets";
import { toast } from "react-toastify";

export default function Orders() {
  const { url, token } = useContext(StoreContext);
  const [data, setData] = useState([]);

  const fetchOrder = async () => {
    const response = await axios.post(
      `${url}/api/order/userorders`,
      {},
      {
        headers: { token },
      }
    );
    setData(response.data.data);
  };

  const handleClick = () => {
    fetchOrder();
    toast.success("Status Updated");
  };

  useEffect(() => {
    if (token) {
      fetchOrder();
    }
  }, []);

  return (
    <div className="m-[50px_0px]">
      <h2 className="font-bold text-3xl">My Orders</h2>
      <div className="flex flex-col gap-5 mt-7">
        {data.map((order, index) => (
          <div
            key={index}
            className="grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr_1fr_2fr_1fr] items-center gap-7 text-[14px] text-[#454545] p-[10px_20px] border border-solid border-[tomato]"
          >
            <img
              className="w-12 mx-auto sm:mx-0"
              src={assets.parcel_icon}
              alt=""
            />
            <p>
              {order.items.map((item, index) => (
                <span key={index}>
                  {item.name} X {item.quantity}
                  {index !== order.items.length - 1 && ", "}
                </span>
              ))}
            </p>
            <p className="text-center sm:text-left">&#8377;{order.amount}.00</p>
            <p className="text-center sm:text-left">
              Items: {order.items.length}
            </p>
            <p className="flex items-center justify-center sm:justify-start">
              <span className="text-[tomato] text-4xl">&bull;</span>
              <b className="text-[#454545] font-medium ml-2">{order.status}</b>
            </p>
            <button
              onClick={handleClick}
              className="p-[12px_0px] rounded bg-[#ffe1e1] text-[#454545] hover:bg-[#eb6f59] w-full sm:w-auto"
            >
              Track order
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
