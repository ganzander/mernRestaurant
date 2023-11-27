import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Card from "../components/Card";
import Footer from "../components/Footer";
import axios from "axios";
import Describe from "./Describe";
import { gsap } from "gsap";

export default function Home() {
  const [search, setSearch] = useState("");

  const [foodItem, setFoodItem] = useState([]);

  const [foodCategory, setFoodCategory] = useState([]);

  React.useEffect(() => {
    axios.get("http://localhost:5000/foodItems").then((result) => {
      if (result.data.Success === "true") {
        setFoodItem(result.data.foodItem);
      }
    });
    axios.get("http://localhost:5000/foodCategory").then((result) => {
      if (result.data.Success === "true") {
        setFoodCategory(result.data.foodCategory);
      }
    });
  }, []);

  return (
    <>
      <div>
        <Navbar />
      </div>

      <div className="">
        <Describe />
      </div>
      <div className="container form-inline mt-5 mb-5">
        <input
          className="form-control d-flex justify-content-center align-items-center search-bar"
          style={{ border: "3px solid grey" }}
          type="search"
          placeholder="Search"
          aria-label="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="container">
        {foodCategory.length > 0 &&
          foodCategory.map((data, index) => {
            return (
              <div className="row mb-3" key={index}>
                <div className="fs-3 m-3">{data.CategoryName}</div>
                <div className="line my-3" />

                {foodItem.length > 0 &&
                  foodItem
                    .filter(
                      (food) =>
                        food.CategoryName == data.CategoryName &&
                        food.name
                          .toLowerCase()
                          .includes(search.toLocaleLowerCase())
                    )
                    .map((filteredFood) => {
                      return (
                        <div
                          className="col-12 col-md-6 col-lg-3"
                          key={filteredFood._id}
                        >
                          <Card
                            foodItem={filteredFood}
                            options={filteredFood.options}
                          />
                        </div>
                      );
                    })}
              </div>
            );
          })}
      </div>
      <div>
        <Footer />
      </div>
    </>
  );
}
