import React, { useContext, useState } from "react";
import { StoreContext } from "../context/StoreContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function PlaceOrder() {
  const { getTotalCartAmount, cart, token, url, loadCartData, food_list } =
    useContext(StoreContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    city: "",
    state: "",
    pinCode: "",
    phoneNumber: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const loadRazorpay = (orderData) => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => initializeRazorpay(orderData);
    document.body.appendChild(script);
  };

  const initializeRazorpay = (orderData) => {
    const { orderId, razorpayOrderId, amount, currency } = orderData;

    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: amount,
      currency: currency,
      name: "Borcelle Kitchen",
      description: "Transaction",
      order_id: razorpayOrderId,
      handler: async function (response) {
        const paymentData = {
          orderId: orderId,
          razorpay_order_id: response.razorpay_order_id,
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_signature: response.razorpay_signature,
        };

        // Verify payment in backend
        const verifyResponse = await axios.post(
          `${url}/api/order/payment`,
          paymentData,
          {
            headers: { token },
          },
        );
        if (verifyResponse.data.success) {
          navigate("/myorder");
          loadCartData(localStorage.getItem("token"));
          toast.success("Payment successful!");
        } else {
          navigate("/");
          loadCartData(localStorage.getItem("token"));
          toast.error("Payment verification failed");
        }
      },
      prefill: {
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        contact: formData.phoneNumber,
      },
      theme: {
        color: "#3399cc",
      },
    };

    const rzp1 = new window.Razorpay(options);
    rzp1.on("payment.failed", function (response) {
      toast.error(response.error.metadata.payment_id);
    });
    rzp1.open();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const items = [];
    food_list.map((item) => {
      if (cart[item._id] > 0) {
        let itemInfo = item;
        itemInfo["quantity"] = cart[item._id];
        items.push(itemInfo);
      }
    });

    const orderData = {
      items,
      amount: getTotalCartAmount() + 40,
      address: formData,
    };

    try {
      // Create order in backend
      const { data } = await axios.post(`${url}/api/order/place`, orderData, {
        headers: { token },
      });

      // Load Razorpay and open payment form
      loadRazorpay(data);
    } catch (error) {
      console.error("Error in placing order:", error);
      alert("Error in placing order");
    }
  };

  return (
    <form
      className="flex flex-col lg:flex-row items-start justify-between gap-12 mt-24 p-4"
      onSubmit={handleSubmit}
    >
      <div className="w-full max-w-[max(30%,500px)]">
        <p className="text-[30px] font-semibold mb-12">Delivery Information</p>
        <div className="flex gap-5">
          <input
            className="mb-4 w-full p-2 rounded border-[1px_solid_#c9c9c9] outline-[tomato] border-[2px]"
            type="text"
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleInputChange}
            required
          />
          <input
            className="mb-4 w-full p-2 rounded border-[1px_solid_#c9c9c9] outline-[tomato] border-[2px]"
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleInputChange}
            required
          />
        </div>
        <input
          className="mb-4 w-full p-2 rounded border-[1px_solid_#c9c9c9] outline-[tomato] border-[2px]"
          type="email"
          name="email"
          placeholder="Your email"
          value={formData.email}
          onChange={handleInputChange}
          required
        />
        <input
          className="mb-4 w-full p-2 rounded border-[1px_solid_#c9c9c9] outline-[tomato] border-[2px]"
          type="text"
          name="address"
          placeholder="Your Address"
          value={formData.address}
          onChange={handleInputChange}
          required
        />
        <div className="flex gap-5">
          <input
            className="mb-4 w-full p-2 rounded border-[1px_solid_#c9c9c9] outline-[tomato] border-[2px]"
            type="text"
            name="city"
            placeholder="City"
            value={formData.city}
            onChange={handleInputChange}
            required
          />
          <input
            className="mb-4 w-full p-2 rounded border-[1px_solid_#c9c9c9] outline-[tomato] border-[2px]"
            type="text"
            name="state"
            placeholder="State"
            value={formData.state}
            onChange={handleInputChange}
            required
          />
        </div>
        <input
          className="mb-4 w-full p-2 rounded border-[1px_solid_#c9c9c9] outline-[tomato] border-[2px]"
          type="number"
          name="pinCode"
          maxLength={6}
          minLength={6}
          placeholder="Pin-code"
          value={formData.pinCode}
          onChange={handleInputChange}
          required
        />
        <input
          className="mb-4 w-full p-2 rounded border-[1px_solid_#c9c9c9] outline-[tomato] border-[2px]"
          type="number"
          name="phoneNumber"
          maxLength={10}
          minLength={10}
          placeholder="Phone number"
          value={formData.phoneNumber}
          onChange={handleInputChange}
          required
        />
      </div>
      <div className="w-full max-w-[max(40%,500px)]">
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
            type="submit"
            className="bg-[tomato] rounded text-white w-full lg:w-[max(15vw,200px)] p-2 hover:bg-[#fa4b2c] mt-7"
          >
            Proceed to Payment
          </button>
        </div>
      </div>
    </form>
  );
}
