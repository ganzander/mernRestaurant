const mongoose = require("mongoose");
const validator = require("validator");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Not Valid Email");
        }
      },
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    date: {
      type: String,
      default: new Date(),
    },
    tokens: {
      token: {
        type: String,
        required: true,
      },
    },
    cart: {
      type: Array,
    },
    order: {
      type: Array,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    imgUrl: {
      type: String,
      default:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Windows_10_Default_Profile_Picture.svg/2048px-Windows_10_Default_Profile_Picture.svg.png",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("users", UserSchema);
