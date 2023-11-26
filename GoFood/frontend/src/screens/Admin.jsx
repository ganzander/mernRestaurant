import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Navbar from "../components/Navbar";
import Footer from "./../components/Footer";

export default function Admin() {
  const [foodDetails, setFoodDetails] = useState({
    categoryName: "",
    name: "",
    imgurl: "",
    description: "",
    options: [],
  });

  function addFoodItems(event) {
    event.preventDefault();
    const { categoryName, name, imgurl, description, options } = foodDetails;

    if (!categoryName || !name || !imgurl || !description || !options) {
      alert("Please fill in the form completely");
    } else {
      axios
        .post("http://localhost:5000/createFood", {
          categoryName,
          name,
          imgurl,
          description,
          options,
        })
        .then((result) => {
          if (result.data.Success === true) {
            toast.success("Item added to the menu");
          } else {
            toast.error("Item already preseent in the menu");
          }
        });
    }
  }

  function onchange(event) {
    setFoodDetails({
      ...foodDetails,
      [event.target.name]: event.target.value,
    });
  }

  return (
    <>
      <div>
        <Navbar />
      </div>
      <div className="container mt-5">
        <div className="row">
          <div className="col-lg-12 col-md-12 col-sm-12">
            <div className="adminpanel">
              <div className="d-flex justify-content-center align-items-center m-3 mt-2">
                <h1>Update the menu</h1>
              </div>
              <form onSubmit={addFoodItems}>
                <div className="form-group my-3 mt-3 my-3 mt-3">
                  <label htmlFor="CategoryName">Category Name</label>
                  <input
                    style={{ border: "3px solid #ecc00e" }}
                    type="text"
                    className="form-control"
                    name="categoryName"
                    id="CategoryName"
                    placeholder="Enter Category Name"
                    value={foodDetails.categoryName}
                    onChange={onchange}
                    autoComplete="off"
                  />
                </div>
                <div className="form-group my-3 mt-3">
                  <label htmlFor="name">Name</label>
                  <input
                    style={{ border: "3px solid #ecc00e" }}
                    type="text"
                    name="name"
                    className="form-control"
                    id="name"
                    placeholder="Enter Name"
                    value={foodDetails.name}
                    onChange={onchange}
                    autoComplete="off"
                  />
                </div>
                <div className="form-group my-3 mt-3">
                  <label htmlFor="image">Image URL</label>
                  <input
                    style={{ border: "3px solid #ecc00e" }}
                    type="text"
                    name="imgurl"
                    className="form-control"
                    id="image"
                    placeholder="Enter Image URL"
                    value={foodDetails.imgurl}
                    onChange={onchange}
                    autoComplete="off"
                  />
                </div>
                <div className="form-group my-3 mt-3">
                  <label htmlFor="description">Description</label>
                  <input
                    style={{ border: "3px solid #ecc00e" }}
                    type="text"
                    name="description"
                    className="form-control"
                    id="description"
                    placeholder="Enter Description"
                    value={foodDetails.description}
                    onChange={onchange}
                    autoComplete="off"
                  />
                </div>
                <div className="form-group my-3 mt-3">
                  <label htmlFor="options">Options</label>
                  <input
                    style={{ border: "3px solid #ecc00e" }}
                    type="text"
                    name="options"
                    className="form-control"
                    id="options"
                    value={foodDetails.options}
                    placeholder="Enter Options"
                    onChange={onchange}
                    autoComplete="off"
                  />
                  {
                    <small>
                      {<p> "regular":"70","medium":"100","large":"120" </p>}
                    </small>
                  }
                </div>
                <div className="d-flex mt-3 justify-content-center align-items center">
                  <button type="submit" className="btn btn-primary">
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
