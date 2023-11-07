import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Navbar from "../components/Navbar";

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
              <h1>Update the menu</h1>
              <form onSubmit={addFoodItems}>
                <div className="form-group">
                  <label htmlFor="CategoryName">Category Name</label>
                  <input
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
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input
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
                <div className="form-group">
                  <label htmlFor="image">Image URL</label>
                  <input
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
                <div className="form-group">
                  <label htmlFor="description">Description</label>
                  <input
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
                <div className="form-group">
                  <label htmlFor="options">options</label>
                  <input
                    type="text"
                    name="options"
                    className="form-control"
                    id="options"
                    value={foodDetails.options}
                    placeholder="Enter Options"
                    onChange={onchange}
                    autoComplete="off"
                  />
                  {<small>{<p> "meal":"180","single":"55" </p>}</small>}
                </div>

                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
