import React, { useEffect, useState } from "react";
import Product from "./Product";
import { getAllProducts } from "../../functions/product";
import style from "./style.css";

export default function ProfileProducts(props) {
  const { products, handleDeleteProduct, id } = props;

  return (
    <div style={{ width: "100%" }}>
      <h1>Your Products</h1>
      <div className="product_grid">
        {products ? (
          products.map((product) => (
            <Product
              key={product._id}
              product={product}
              handleDeleteProduct={handleDeleteProduct}
            />
          ))
        ) : (
          <p>Add a new product</p>
        )}
      </div>
    </div>
  );
}
