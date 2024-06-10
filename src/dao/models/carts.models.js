import mongoose, { Schema } from "mongoose";

import usersModel from "./users.models.js";
import productsModel from "./products.models.js";

mongoose.pluralize(null);

const cartsCollection = "carts";

const cartsSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "user_index",
  },
  products: {
    type: [{ _id: mongoose.Schema.Types.ObjectId, quantity: Number }],
    required: true,
    ref: "products",
  },
});

cartsSchema.pre("find", function () {
  this.populate({ path: "user", model: usersModel });
  this.populate({ path: "products._id", model: productsModel });
});

const cartsModel = mongoose.model(cartsCollection, cartsSchema);

export default cartsModel;
