import React from "react";
import ItemCart from "./ItemCart";
import { chechOut } from "../../functions/checkout";
import { useSelector } from "react-redux";

export default function HomeRight(props) {
  const { itemsCart, handleRemoveItem } = props;
  const { user } = useSelector((state) => ({ ...state }));
  const token = user.token;
  const id = user.id;

  const handleCheckOut = async () => {
    try {
      const cartItems = itemsCart?.map((item) => ({
        count: item.count,
        productId: item._id,
      }));
      const response = await chechOut(id, cartItems, token);
      window.location.reload(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div>Check out {itemsCart.length}</div>
      <div>
        Total{" "}
        {itemsCart.reduce(
          (sum, item) => sum + parseFloat(item.price) * item.count,
          0
        )}
      </div>
      <button onClick={() => handleCheckOut()}>checkout</button>
      {itemsCart ? (
        itemsCart.map((item) => (
          <ItemCart
            key={item._id}
            item={item}
            handleRemoveItem={handleRemoveItem}
          />
        ))
      ) : (
        <span>Add items to the cart</span>
      )}
    </div>
  );
}
