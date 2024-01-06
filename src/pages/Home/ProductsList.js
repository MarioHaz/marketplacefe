import React, { useState } from "react";
import HomeLeft from "./HomeLeft";
import HomeRight from "./HomeRight";

export default function ProductsList() {
  const [itemsCart, setItemsCart] = useState([]);

  const handleClickCart = (product) => {
    const cartProduct = itemsCart.find((item) => item._id === product._id);

    if (cartProduct) {
      const updatedItemsCart = itemsCart.map((item) =>
        item._id === cartProduct._id ? { ...item, count: item.count + 1 } : item
      );
      setItemsCart(updatedItemsCart);
    } else {
      product.count = 1;
      setItemsCart([...itemsCart, product]);
    }
  };

  const handleRemoveItem = (idToRemove) => {
    setItemsCart(itemsCart.filter((item) => item._id !== idToRemove));
  };

  console.log(itemsCart);
  return (
    <div className="product_list">
      <h1>All Products</h1>
      <div className="items_and_store">
        <HomeLeft handleClickCart={handleClickCart} />
        <HomeRight itemsCart={itemsCart} handleRemoveItem={handleRemoveItem} />
      </div>
    </div>
  );
}
