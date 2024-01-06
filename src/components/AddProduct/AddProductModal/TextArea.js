import React from "react";

export default function TextArea(props) {
  const { product, setProduct, user, type2, placeholder } = props;

  return (
    <div className={type2 ? "images_input" : ""}>
      <div className={!type2 ? "flex_center" : ""}>
        <textarea
          placeholder={placeholder}
          maxLength="1000"
          value={product}
          className={`post_input ${type2 ? "input2" : ""}`}
          onChange={(e) => setProduct(e.target.value)}
        ></textarea>
      </div>
      <div className={!type2 ? "post_emoji_wrap" : ""}></div>
    </div>
  );
}
