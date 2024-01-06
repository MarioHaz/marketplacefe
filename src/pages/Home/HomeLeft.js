import React from "react";
import AllProducts from "../../components/AllProducts/AllProducts";

export default function HomeLeft(props) {
  const { handleClickCart } = props;
  return (
    <div className="home_left">
      <AllProducts handleClickCart={handleClickCart} />
    </div>
  );
}
