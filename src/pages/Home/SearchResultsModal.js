import React from "react";
import Item from "../../components/Header/Item";

export default function SearchResultsModal(props) {
  const { searchProduct } = props;

  return (
    <div className="postBox">
      {searchProduct ? (
        searchProduct.map((product) => (
          <Item key={product._id} product={product} />
        ))
      ) : (
        <span>No results</span>
      )}
    </div>
  );
}
