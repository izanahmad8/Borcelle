import { useContext } from "react";
import { StoreContext } from "../context/StoreContext";
import FoodItem from "./FoodItem";

export default function FoodList({ category }) {
  const { food_list } = useContext(StoreContext);
  return (
    <div className="mt-7">
      <h2 className="text-[max(2vw,24px)] font-semibold">
        Top Dishes Near You
      </h2>
      <div className=" grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] mt-7 gap-7 gap-y-12">
        {food_list.map((item, index) => {
          if (category === "All" || item.category === category) {
            return (
              <FoodItem
                key={index}
                id={item._id}
                name={item.name}
                description={item.description}
                price={item.price}
                image={item.image}
              />
            );
          }
        })}
      </div>
    </div>
  );
}
