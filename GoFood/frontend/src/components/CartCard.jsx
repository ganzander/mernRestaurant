import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart } from "../store/slices/CartSlice";
import toast from "react-hot-toast";

export default function CartCard(props) {
  let options = props.options;

  const [qty, setQty] = useState(props.foodItem.qtyOrdered);
  const [size, setSize] = useState(props.foodItem.size);
  const dispatch = useDispatch();

  function deleteCartItem(item) {
    console.log(item);
    toast.success("Item deleted from cart");
    dispatch(removeFromCart(item));
  }

  let finalPrice;

  if ("half" === size) {
    finalPrice = props.options[0].half * qty;
  } else if ("full" === size) {
    finalPrice = props.options[0].full * qty;
  } else if ("large" === size) {
    finalPrice = props.options[0].large * qty;
  } else if ("regular" === size) {
    finalPrice = props.options[0].regular * qty;
  } else if ("medium" === size) {
    finalPrice = props.options[0].medium * qty;
  }

  return (
    <article className="card mt-3 food" style={{ border: "5px solid #ecc00e" }}>
      <div className="img-container">
        <img src={props.foodItem.img} alt={props.foodItem.name} />
      </div>
      <div className="food-footer text-center p-2">
        <h4>{props.foodItem.name}</h4>
      </div>
      <div className="container w-100">
        <p
          className="text-center rounded m-2 h-100 "
          style={{ backgroundColor: "#ecc00e" }}
          value={qty}
        >
          Quantity: {qty}
        </p>

        <p
          className="text-center rounded m-2 h-100 "
          style={{ backgroundColor: "#ecc00e" }}
          value={size}
        >
          Size: {size}
        </p>
      </div>
      <div className="d-inline h-100 fs-5 mt-2 mx-2 text-center">
        ₹{finalPrice}/-
      </div>
      <div
        className="my-3"
        style={{
          height: "1px",
          borderRadius: "1.5px",
          width: "100%",
          backgroundColor: "#ecc00e",
        }}
      />
      <button
        className="btn justify-center btn-danger m-2 mb-2"
        onClick={() => {
          deleteCartItem(props.foodItem);
        }}
      >
        Remove From Cart
      </button>
    </article>
  );
}
