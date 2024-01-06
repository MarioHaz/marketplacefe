import React, { useState } from "react";
import PulseLoader from "react-spinners/PulseLoader";
import style from "./style.css";
import dataURIToBlob from "../../../helpers/dataUriToBlob";
import { uploadImages } from "../../../functions/uploadImages";
import { addProduct } from "../../../functions/product";
import ImagePreview from "./ImagePreview";

export default function AddProductModal(props) {
  const { setVisible, user, dispatch, profile, products, onReload } = props;

  const [loading, setLoading] = useState(false);
  const [text, setText] = useState("");
  const [price, setPrice] = useState("");
  const [showPrev, setShowPrev] = useState(false);
  const [error, setError] = useState("");
  const [images, setImages] = useState([]);
  const [product, setProduct] = useState("");
  const userId = user.id;

  const productSubmit = async () => {
    if (images && images.length) {
      console.log(images);
      setLoading(true);
      const postImages = images.map((img) => {
        return dataURIToBlob(img);
      });

      const path = `${user.email}/post_Images`;
      let formData = new FormData();
      formData.append("path", path);
      postImages.forEach((image) => {
        formData.append("file", image);
      });

      const response = await uploadImages(formData, path, user.token);
      console.log(response);

      const res = await addProduct(
        null,
        text,
        price,
        product,
        response,
        userId,
        user.token
      );
      setLoading(false);

      if (res.status === "ok") {
        setText("");
        setImages("");
        setPrice("");
        setProduct("");
        setVisible(false);
        onReload();
      } else {
        setError(res);
      }
    } else if (text) {
      setLoading(true);
      const res = await addProduct(
        null,
        text,
        price,
        product,
        null,
        userId,
        user.token
      );

      setLoading(false);
      if (res.status === "ok") {
        setText("");
        setVisible(false);
        onReload();
      } else {
        setError(res);
      }
    } else {
      console.log("nothing");
    }
  };
  return (
    <div className="blurr">
      <div className="postBox">
        <div className="box_header">
          <div
            className="small_circle"
            onClick={() => {
              setVisible(false);
            }}
          >
            <span></span>
            <i>X</i>
          </div>
          <span>Add a product</span>
        </div>
        <ImagePreview
          product={product}
          setProduct={setProduct}
          text={text}
          setText={setText}
          user={user}
          images={images}
          setImages={setImages}
          setShowPrev={setShowPrev}
          setError={setError}
          price={price}
          setPrice={setPrice}
        />

        <button
          className="post_submit"
          onClick={() => {
            productSubmit();
          }}
          disabled={loading}
        >
          {loading ? <PulseLoader color="white" size={5} /> : "Add"}
        </button>
      </div>
    </div>
  );
}
