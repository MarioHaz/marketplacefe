import React, { useState } from "react";
import Header from "../../components/Header/Header";
import style from "./style.css";
import ProductsList from "./ProductsList";
import SearchResultsModal from "./SearchResultsModal";

export default function Home() {
  return (
    <div className="home">
      <Header />
      <>
        <ProductsList />
      </>
    </div>
  );
}
