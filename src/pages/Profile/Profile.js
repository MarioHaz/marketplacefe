import React, { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import AddProduct from "../../components/AddProduct/AddProduct";
import style from "./style.css";
import { useDispatch } from "react-redux";
import ProfileProducts from "../../components/ProfileProducts/ProfileProducts";
import AddProductModal from "../../components/AddProduct/AddProductModal/AddProductModal";
import {
  deleteProduct,
  deleteProducts,
  getAllProducts,
  getUserProducts,
} from "../../functions/product";

export default function Profile(props) {
  const { user } = props;
  const [visible, setVisible] = useState(false);
  const [products, setProducts] = useState([]);
  const [reload, setReload] = useState(false);
  const id = user.id;

  const onReload = () => {
    setReload((prev) => !prev);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getUserProducts(id, user.token);
        setProducts(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProducts();
  }, [reload]);

  const handleDeleteProduct = async (productId) => {
    try {
      const deleteProd = await deleteProduct(productId, user.token);
      onReload();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Header profile />
      <div className="profile">
        <AddProduct setVisible={setVisible} />
        <ProfileProducts
          products={products}
          handleDeleteProduct={handleDeleteProduct}
        />
        {visible ? (
          <AddProductModal
            setVisible={setVisible}
            user={user}
            profile
            onReload={onReload}
          />
        ) : null}
      </div>
    </>
  );
}
