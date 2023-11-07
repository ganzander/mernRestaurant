const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const { MongoClient } = require("mongodb");

const port = 5000;

const app = express();
app.use(cors());
app.use(express.json());

app.use("/", require("./Routes/CreateUser"));
app.use("/", require("./Routes/CreateFood"));

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
