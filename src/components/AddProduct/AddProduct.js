import React from "react";
import style from "./style.css";

export default function AddProduct(props) {
  const { setVisible } = props;
  return (
    <div className="add_product">
      <div>
        <input
          placeholder="add a product..."
          onClick={() => setVisible((prev) => !prev)}
        />
      </div>
    </div>
  );
}
