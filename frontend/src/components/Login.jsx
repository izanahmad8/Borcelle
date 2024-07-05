import { useContext, useState } from "react";
import axios from "axios";
import { assets } from "../assets/assets";
import { StoreContext } from "../context/StoreContext";
import { toast } from "react-toastify";

export default function Login({ setShowLogin }) {
  const { url, setToken } = useContext(StoreContext);
  const [currState, setcurrState] = useState("Login");
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((data) => ({ ...data, [name]: value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (currState === "Login") {
      try {
        const response = await axios.post(`${url}/api/user/login`, {
          email: data.email,
          password: data.password,
        });
        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem("token", response.data.token);
          setShowLogin(false);
          toast.success(response.data.message);
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        toast.error(error.response.data.message);
      }
    } else {
      try {
        const response = await axios.post(`${url}/api/user/signup`, {
          name: data.name,
          email: data.email,
          password: data.password,
        });
        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem("token", response.data.token);
          setShowLogin(false);
          toast.success(response.data.message);
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        toast.error(error.response.data.message);
      }
    }
  };

  return (
    <div className="absolute grid bg-[#00000090] h-full w-full z-10">
      <form
        onSubmit={handleSubmit}
        className=" place-self-center text-[#808080] w-[max(23vw,330px)] bg-white flex flex-col gap-6 px-6 py-8 rounded-lg text-[14px]"
        style={{ animation: "fadeIn 0.5s" }}
      >
        <div className="flex justify-between items-center text-black">
          <h2 className=" font-bold text-2xl">{currState}</h2>
          <img
            className="w-4 cursor-pointer"
            onClick={() => setShowLogin(false)}
            src={assets.cross_icon}
            alt=""
          />
        </div>
        <div className="flex flex-col gap-5">
          {currState === "Login" ? (
            <></>
          ) : (
            <input
              onChange={handleChange}
              value={data.name}
              className=" outline-none border-[2px] p-2 border-solid border-[#c9c9c9] rounded"
              type="text"
              placeholder="Your Name"
              name="name"
              required
            />
          )}
          <input
            onChange={handleChange}
            value={data.email}
            className=" outline-none border-[2px] p-2 border-solid border-[#c9c9c9] rounded"
            type="email"
            placeholder="Your email"
            name="email"
            required
          />
          <input
            onChange={handleChange}
            value={data.password}
            className=" outline-none border-[2px] p-2 border-solid border-[#c9c9c9] rounded"
            type="password"
            placeholder="Your password"
            name="password"
            required
          />
        </div>
        <button
          type="submit"
          className=" bg-[tomato] text-white p-2 rounded text-[15px] hover:bg-[#fe4626]"
        >
          {currState === "Sign Up" ? "Create Account" : "Login"}
        </button>
        <div className="flex items-start mt-[-15px] gap-2">
          <input className="mt-1" type="checkbox" required />
          <p>By continuing , I agree to the terms and conditions</p>
        </div>
        {currState === "Login" ? (
          <></>
        ) : (
          <p>
            Already have an Account?{" "}
            <span
              className=" cursor-pointer text-[tomato]"
              onClick={() => setcurrState("Login")}
            >
              Login Here
            </span>
          </p>
        )}
        {currState === "Sign Up" ? (
          <></>
        ) : (
          <p>
            Create an Account?{" "}
            <span
              className=" cursor-pointer text-[tomato]"
              onClick={() => setcurrState("Sign Up")}
            >
              Click Here
            </span>
          </p>
        )}
      </form>
    </div>
  );
}
