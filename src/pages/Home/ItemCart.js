import React from "react";

export default function ItemCart(props) {
  const { item, handleRemoveItem } = props;
  const imageUrl =
    item.images && item.images.length > 0 ? item.images[0].url : null;
  return (
    <div className="item_cart">
      {imageUrl && <img className="image_cart" src={imageUrl} alt="Product" />}
      <div>{item?.product}</div>
      <div>{item?.text}</div>
      <div>{item?.price}</div>
      <div>{item?.count}</div>
      <button onClick={() => handleRemoveItem(item._id)}>X</button>
    </div>
  );
}
