import React, { useState, useEffect } from "react";

export default function OrderCard(props) {
  const [qty, setQty] = useState(props.foodItem.qtyOrdered);
  const [size, setSize] = useState(props.foodItem.size);

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
      <div className="food-footer p-2 text-center">
        <h4>{props.foodItem.name}</h4>
      </div>
      <div className="food-footer p-2 text-center">
        <p>{props.foodItem.description}</p>
      </div>
      <div className="container w-100">
        <p
          className="text-center m-2 h-100 rounded"
          style={{ backgroundColor: "#ecc00e" }}
          value={qty}
        >
          Quantity: {qty}
        </p>

        <p
          className="text-center m-2 h-100 rounded"
          style={{ backgroundColor: "#ecc00e" }}
          value={size}
        >
          Size: {size}
        </p>

        <div className="d-inline h-100 fs-5 mt-2 text-center">
          ₹{finalPrice}/-
        </div>
        <hr />
      </div>
    </article>
  );
}
