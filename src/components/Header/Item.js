import React from "react";

export default function Item(props) {
  const { product } = props;

  const imageUrl =
    product.images && product.images.length > 0 ? product.images[0].url : null;

  return (
    <div className="box">
      <div className="product_name">{product?.product}</div>
      <div className="product_description">{product?.text}</div>
      {imageUrl && <img className="image" src={imageUrl} alt="Product" />}
      <div className="product_price">{product?.price}</div>
      <div className="product_option">
        <button>Add+</button>
      </div>
    </div>
  );
}
