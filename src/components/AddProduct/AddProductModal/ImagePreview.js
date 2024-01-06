import React, { useRef } from "react";
import TextArea from "./TextArea";
import PriceArea from "./PriceArea";
import TextArea2 from "./TextArea2";

export default function ImagePreview(props) {
  const {
    text,
    setText,
    user,
    images,
    setImages,
    setShowPrev,
    setError,
    price,
    setPrice,
    product,
    setProduct,
  } = props;
  const imageInputRef = useRef(null);
  const handleImages = (e) => {
    let files = Array.from(e.target.files);
    files.forEach((img) => {
      if (
        img.type !== "image/jpeg" &&
        img.type !== "image/png" &&
        img.type !== "image/jpg" &&
        img.type !== "image/svg" &&
        img.type !== "image/webp"
      ) {
        setError(
          `The format of the image is not supported, only jpeg, png, jpg, svg and webp.`
        );
        files = files.filter((item) => item.name !== img.name);
        return;
      } else if (img.size > 1024 * 1024 * 5) {
        setError(`The size of the image is too large, max 5MB allowed.`);
        files = files.filter((item) => item.name !== img.name);
        return;
      }
      e.target.value = null;
      const reader = new FileReader();
      reader.readAsDataURL(img);
      reader.onload = (readerEvent) => {
        setImages((images) => [...images, readerEvent.target.result]);
      };
    });
  };
  return (
    <div className="overflow_a scrollbar">
      <TextArea
        product={product}
        setProduct={setProduct}
        user={user}
        value={product}
        type2
        placeholder="Add the name of the product"
      />
      <TextArea2
        text={text}
        setText={setText}
        user={user}
        value={text}
        type2
        placeholder="Add the description of the product"
      />
      <div className="add_pics_wrap ">
        <input
          type="file"
          accept="image/jpeg, image/png, image/jpg, image/svg, image/webp"
          multiple
          hidden
          ref={imageInputRef}
          onChange={handleImages}
        />
        {images && images.length ? (
          <div className="add_pics_inside1 p0 scrollbar">
            <div className="preview_actions">
              {/* <button className="hover1">Edit</button> */}
              <button
                className="hover1"
                onClick={() => {
                  imageInputRef.current.click();
                }}
              >
                <i className="add_Photo_icon"></i>
                Add Photo or Video
              </button>
            </div>
            <div
              className="small_white_circle"
              onClick={() => {
                setImages([]);
              }}
            >
              <i>X</i>
            </div>
            <div
              className={
                images.length === 1
                  ? "preview1"
                  : images.length === 2
                  ? "preview2"
                  : images.length === 3
                  ? "preview3"
                  : images.length === 4
                  ? "preview4"
                  : images.length === 5
                  ? "preview5"
                  : images.length % 2 === 0
                  ? "preview6"
                  : "preview6 singular_grid"
              }
            >
              {images.map((img, i) => (
                <img src={img} key={i} alt="" />
              ))}
            </div>
          </div>
        ) : (
          <div className="add_pics_inside1">
            <div
              className="add_col"
              onClick={() => {
                imageInputRef.current.click();
              }}
            >
              <div className="add_circle">(+)</div>
              <span>Click to Add Photo</span>
              <span> or drag and drop</span>
            </div>
          </div>
        )}
      </div>
      <PriceArea price={price} setPrice={setPrice} type2 />
    </div>
  );
}
