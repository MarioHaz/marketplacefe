import React from "react";

export default function PriceArea(props) {
  const { price, setPrice, type2 } = props;

  return (
    <div className={type2 ? "images_input" : ""}>
      <div className={!type2 ? "flex_center" : ""}>
        <input
          type="number"
          placeholder="Add the price of your  "
          maxLength="10"
          value={price}
          className={`post_input ${type2 ? "input2" : ""}`}
          onChange={(e) => setPrice(e.target.value)}
        />
      </div>
      <div className={!type2 ? "post_emoji_wrap" : ""}></div>
    </div>
  );
}
