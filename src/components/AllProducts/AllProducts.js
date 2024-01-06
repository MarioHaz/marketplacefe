import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getAllProducts } from "../../functions/product";
import HomeProducts from "./HomeProducts";
import style from "./style.css";

export default function AllProducts(props) {
  const { handleClickCart } = props;
  const { user } = useSelector((state) => ({ ...state }));
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getAllProducts(user.token);
        setProducts(response.data); // Assuming response is an array of products
      } catch (error) {
        console.error(error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="product_grid">
      {products ? (
        products.map((product) => (
          <HomeProducts
            key={product._id}
            product={product}
            handleClickCart={handleClickCart}
          />
        ))
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
