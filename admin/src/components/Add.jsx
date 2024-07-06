import { useState } from "react";
import assets from "../assets/assets";
import axios from "axios";
import { toast } from "react-toastify";

export default function Add({ url }) {
  const [image, setImage] = useState(false);

  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    category: "Salad",
  });

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", Number(data.price));
    formData.append("category", data.category);
    formData.append("image", image);
    try {
      const response = await axios.post(`${url}/api/food/add`, formData);
      if (response.data.success) {
        setData({
          name: "",
          description: "",
          price: "",
          category: "Salad",
        });
        setImage(false);
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="w-[70%] mt-[50px] ml-[max(5vw,25px)] text-[#6d6d6d] text-[16px] sm:w-full sm:ml-0 sm:px-4">
      <form onSubmit={handleSubmit} className="gap-5 flex-column">
        <div className="flex-column">
          <p>Upload Image</p>
          <label htmlFor="image">
            <img
              className="w-[120px]"
              src={image ? URL.createObjectURL(image) : assets.upload_area}
              alt=""
            />
          </label>
          <input
            onChange={(e) => setImage(e.target.files[0])}
            type="file"
            id="image"
            hidden
          />
        </div>
        <div className="flex-column w-[max(40%,280px)]">
          <p>Product Name</p>
          <input
            onChange={handleChange}
            value={data.name}
            className="p-[10px] border-[1px] border-solid border-black w-full"
            type="text"
            name="name"
            placeholder="Enter product name"
            required
          />
        </div>
        <div className="flex-column w-[max(40%,280px)]">
          <p>Product Description</p>
          <textarea
            onChange={handleChange}
            value={data.description}
            className="p-[10px] border-[1px] border-solid border-black w-full"
            name="description"
            rows="6"
            placeholder="Enter description of the product"
            required
          ></textarea>
        </div>
        <div className="flex gap-8 sm:flex-row sm:gap-4">
          <div className="flex-column ">
            <p>Product Category</p>
            <select
              onChange={handleChange}
              value={data.category}
              className="max-w-[120px] p-[10px] border-[1px] border-solid border-black sm:w-full"
              name="category"
              required
            >
              <option value="Salad">Salad</option>
              <option value="Rolls">Rolls</option>
              <option value="Deserts">Deserts</option>
              <option value="Sandwich">Sandwich</option>
              <option value="Cake">Cake</option>
              <option value="Pure Veg">Pure Veg</option>
              <option value="Pasta">Pasta</option>
              <option value="Noodles">Noodles</option>
            </select>
          </div>
          <div className="flex-column">
            <p>Product Price</p>
            <input
              onChange={handleChange}
              value={data.price}
              className="max-w-[120px] p-[10px] border-[1px] border-solid border-black sm:w-full"
              type="number"
              name="price"
              placeholder="Enter price"
              required
            />
          </div>
        </div>
        <button
          className="max-w-[120px] p-[10px] bg-black border-none text-white rounded sm:w-full"
          type="submit"
        >
          ADD
        </button>
      </form>
    </div>
  );
}
