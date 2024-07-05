import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import assets from "../assets/assets";

export default function Order({ url }) {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    try {
      const response = await axios.get(`${url}/api/order/list`);
      if (response.data.success) {
        setOrders(response.data.data);
      } else {
        toast.error("Error fetching orders");
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
      toast.error("Error fetching orders");
    }
  };

  const statusUpdate = async (e, orderId) => {
    const { value: status } = e.target;
    try {
      const response = await axios.post(`${url}/api/order/status`, {
        orderId,
        status,
      });
      if (response.data.success) {
        await fetchAllOrders();
        toast.success(response.data.message);
      } else {
        toast.error("Failed to update status");
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);

  return (
    <div className="max-w-screen-lg px-4 py-8">
      <h3 className="text-2xl font-bold mb-6">Order page</h3>
      {orders.map((order, index) => (
        <div
          key={index}
          className="border border-solid border-[tomato] rounded-lg shadow-md mb-6"
        >
          <div className="flex flex-col md:flex-row items-center p-4">
            <img
              className="w-12 h-12 rounded-full md:mr-4 mb-4 md:mb-0"
              src={assets.parcel_icon}
              alt=""
            />
            <div className="flex flex-col md:flex-row md:flex-grow md:items-center">
              <div className="md:flex-grow">
                <p className="font-bold">
                  {order.items.map((item, index) => (
                    <span key={index}>
                      {item.name} x {item.quantity}
                      {index !== order.items.length - 1 && ", "}
                    </span>
                  ))}
                </p>
                <p className="text-sm text-gray-600">
                  {order.address.firstName} {order.address.lastName}
                </p>
                <div className="text-sm text-gray-600">
                  <p>{order.address.address},</p>
                  <p>
                    {order.address.city}, {order.address.state},{" "}
                    {order.address.pinCode}
                  </p>
                </div>
                <p className="text-sm text-gray-600">
                  {order.address.phoneNumber}
                </p>
                <p className="text-sm text-gray-600">
                  Items: {order.items.length}
                </p>
                <p className="font-bold">&#8377;{order.amount}</p>
              </div>
              <select
                onChange={(e) => statusUpdate(e, order._id)}
                value={order.status}
                className="rounded border border-solid border-tomato bg-[#ffe8e4] p-2 outline-none mt-4 md:mt-0 md:ml-4"
              >
                <option value="Food Processing">Food Processing</option>
                <option value="Out for Delivery">Out for Delivery</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
