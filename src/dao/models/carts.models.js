import mongoose from "mongoose";

import userIndexModel from "./users.index.js";

mongoose.pluralize(null);

const cartsCollection = "carts";

const cartsSchema = new mongoose.Schema({
  _user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  products: {
    type: [{ _id: mongoose.Schema.Types.ObjectId, quantity: Number }],
    required: true,
  },
  // products: [{ type: Object, required: true }],
});

cartsSchema.pre('find',function(){
  this.populate({path: '_user', model: userIndexModel})
})

const cartsModel = mongoose.model(cartsCollection, cartsSchema);

export default cartsModel;
