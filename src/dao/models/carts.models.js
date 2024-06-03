import mongoose from "mongoose";


mongoose.pluralize(null);

const cartsCollection = "carts";

const cartsSchema = new mongoose.Schema({
  _user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  products: {
    type: [{ _id: mongoose.Schema.Types.ObjectId, quantity: Number }],
    ref:'products',
    required: true,
  },
});

const cartsModel = mongoose.model(cartsCollection, cartsSchema);

export default cartsModel;
