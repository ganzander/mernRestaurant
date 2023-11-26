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
      <div>
        <div
          id="carouselExampleFade"
          className="carousel slide carousel-fade"
          data-bs-ride="carousel"
        >
          <div
            style={{ zIndex: "-1" }}
            className="carousel-inner"
            id="carousel"
          >
            <div className="carousel-caption">
              <div className="form-inline">
                <input
                  className="form-control mr-sm-2 search-bar sticky-top"
                  style={{ border: "3px solid grey" }}
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>
            <div className="carousel-item active">
              <img
                src="https://cals.cornell.edu/sites/default/files/styles/hero_home_desktop/public/2022-06/ifs-hero-food-still-life-1920x1080x72.jpg?h=36398e41&itok=3jGAIYIE"
                className="d-block w-100"
                alt="..."
                style={{ filter: "brightness(70%)" }}
              />
            </div>
            <div className="carousel-item">
              <img
                src="https://hips.hearstapps.com/hmg-prod/images/super-food-for-a-healthy-diet-royalty-free-image-1571253380.jpg"
                className="d-block w-100"
                alt="..."
                style={{ filter: "brightness(70%)" }}
              />
            </div>
            <div className="carousel-item">
              <img
                src="https://cdn.pixabay.com/photo/2017/09/16/19/21/salad-2756467_1280.jpg"
                className="d-block w-100"
                alt="..."
                style={{ filter: "brightness(70%)" }}
              />
            </div>
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleFade"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleFade"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
      <div className="">
        <Describe />
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
