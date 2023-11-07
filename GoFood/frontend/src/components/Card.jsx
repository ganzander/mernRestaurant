import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../store/slices/CartSlice";
import toast from "react-hot-toast";

export default function Card(props) {
  let options = props.options;
  let priceOptions = Object.keys(options[0]);

  const [qty, setQty] = useState(1);
  const [size, setSize] = useState(priceOptions[0]);
  const dispatch = useDispatch();

  function addNewCart(foodItem) {
    toast.success("Item added to cart");
    dispatch(addToCart(foodItem));
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

  useEffect(() => {
    props.foodItem.size = size;
    props.foodItem.qtyOrdered = qty;
    props.foodItem.price = finalPrice;
  }, [qty, size]);

  return (
    <article className="card mt-3 food">
      <div className="img-container">
        <img src={props.foodItem.img} alt={props.foodItem.name} />
      </div>
      <div className="food-footer">
        <h4>{props.foodItem.name}</h4>
      </div>
      <div className="food-footer">
        <p>{props.foodItem.description}</p>
      </div>
      <div className="container w-100">
        <select
          className="m-2 h-100  bg-success rounded"
          value={qty}
          onChange={(e) => {
            setQty(e.target.value);
          }}
        >
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>

        <select
          className="m-2 h-100 bg-success rounded"
          value={size}
          onChange={(e) => {
            setSize(e.target.value);
          }}
        >
          {priceOptions.map((data) => {
            return (
              <option key={data} value={data}>
                {data}
              </option>
            );
          })}
        </select>

        <div className="d-inline h-100 fs-5">₹{finalPrice}/-</div>
        <hr />
        <button
          className="btn btn-success justify-center m-2"
          onClick={() => {
            addNewCart(props.foodItem);
          }}
        >
          Add To Cart
        </button>
      </div>
    </article>
  );
}
