import React, { useState } from "react";
import Header from "./Header";
import Menu from "./Menu";
import FoodList from "./FoodList";
import AppDownload from "./AppDownload";

export default function Home() {
  const [category, setCategory] = useState("All");
  return (
    <div>
      <Header />
      <Menu category={category} setCategory={setCategory} />
      <FoodList category={category} />
      <AppDownload />
    </div>
  );
}
