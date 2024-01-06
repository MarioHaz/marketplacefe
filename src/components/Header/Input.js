import React, { useState } from "react";
import { useSelector } from "react-redux";
import { search } from "../../functions/product";
import SearchResultsModal from "../../pages/Home/SearchResultsModal";

export default function Input() {
  const [searchProduct, setSearchProduct] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [visible, setVisible] = useState(false);
  const { user } = useSelector((state) => ({ ...state }));
  const token = user?.token;

  const searchHandler = async () => {
    if (searchTerm === "") {
      setSearchProduct([]);
    } else {
      const res = await search(searchTerm, token);
      if (res.length === 0) {
        setSearchProduct([{ empty: true }]); // Set a placeholder item indicating empty results
      } else {
        setSearchProduct(res);
      }
    }
  };

  return (
    <div>
      <input
        placeholder="Search for a product..."
        onClick={() => {
          setVisible((prev) => !prev);
        }}
        value={searchTerm}
        onKeyUp={searchHandler}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {visible ? <SearchResultsModal searchProduct={searchProduct} /> : null}
    </div>
  );
}
