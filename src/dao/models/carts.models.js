import mongoose from "mongoose";

mongoose.pluralize(null);

const cartsCollection = "carts";

const cartsSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "users", required: false },
  products: [{ type: Object, required: true }],
});

const cartsModel = mongoose.model(cartsCollection, cartsSchema);

export default cartsModel;
