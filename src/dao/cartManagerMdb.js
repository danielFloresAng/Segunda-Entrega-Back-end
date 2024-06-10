import mongoose from "mongoose";
import cartsModel from "./models/carts.models.js";

class cartManagerMdb {
  constructor() {
    this.carts = cartsModel;
  }

  getAllCarts = async () => {
    return await this.carts.find().lean();
  };
  getCartsUsers = async () => {
    return await this.carts.find();
  };

  getCartsUsers = async () => {
    return await this.carts.find();
  };

  addCart = async (newData, productId) => {
    const productToAdd = await product.findById(productId);
    await this.carts.create({ user: newData.user, products: [productToAdd] });
    console.log(productToAdd);
  };

  getCartById = async (id) => {};

  updateCartFormat = async (id) => {
    try {
      const findCart = await this.carts.find({ _id: id }).lean();

      if (!findCart) {
        throw new Error(`El carrito con ID ${id} no existe`);
      }

      return findCart;
    } catch (err) {
      return err.message;
    }
  };
  updateQuantity = async (cartId, productId, newQuantity) => {
    try {
      const cartObjectId =  mongoose.Types.ObjectId(cartId);
      const productObjectId =  mongoose.Types.ObjectId(productId);

      const findCart = await this.carts
        .findOneAndUpdate(
          { _id: cartObjectId, "products._id._id": productObjectId },
          { $set: { "products.$.quantity": newQuantity } },
          { new: true }
        )
        .lean();

      if (!findCart) {
        throw new Error(
          `El carrito con ID ${cartId}, ó, el producto con ID ${productId} no existe`
        );
      }

      return findCart;
    } catch (err) {
      return err.message;
    }
  };

  deleteProduct = async (cid, pid) => {
    try {
      const updateCart = await this.carts.findByIdAndUpdate(
        cid,
        { $pull: { products: { _id: pid } } },
        { new: true }
      );

      return updateCart;
    } catch (err) {
      return err.message;
    }
  };

  deleteAllProducts = async (cid) => {
    try {
      return await this.carts.findByIdAndUpdate(
        cid,
        { $set: { products: [] } },
        { new: true }
      );
    } catch (err) {
      return err.message;
    }
  };
}

export default cartManagerMdb;
/**
 
i need a method to update the property 'quantity' of one product of a cart by using req.body, the end point to do that is the next: "/:cid/products/:pid"
 i try to use a class an then import it to the cart.routes.js file.
This is the complete code of cartsManager.js: 
import cartsModel from "./models/carts.models.js";

class cartManagerMdb {
  constructor() {
    this.carts = cartsModel;
  }

  getAllCarts = async () => {
    return await this.carts.find().lean();
  };
  getCartsUsers = async () => {
    return await this.carts.find();
  };

  getCartsUsers = async () => {
    return await this.carts.find();
  };

  addCart = async (newData, productId) => {
    const productToAdd = await product.findById(productId);
    await this.carts.create({ user: newData.user, products: [productToAdd] });
    console.log(productToAdd);
  };

  getCartById = async (id) => {};

  updateCartFormat = async (id) => {
    try {
      const findCart = await this.carts.find({ _id: id }).lean();

      if (!findCart) {
        throw new Error(`El carrito con ID ${id} no existe`);
      }

      return findCart;
    } catch (err) {
      return err.message;
    }
  };
  updateQuantity = async (cartId, productId) => {
    try {
      const findCart = await this.carts.findOneAndUpdate({ _id: cartId }).lean();
      // findCart.find();

      if (!findCart) {
        throw new Error(`El carrito con ID ${id} no existe`);
      }

      return findCart;
    } catch (err) {
      return err.message;
    }
  };

  deleteProduct = async (cid, pid) => {
    try {
      const updateCart = await this.carts.findByIdAndUpdate(
        cid,
        { $pull: { products: { _id: pid } } },
        { new: true }
      );

      return updateCart;
    } catch (err) {
      return err.message;
    }
  };

  deleteAllProducts = async (cid) => {
    try {
      return await this.carts.findByIdAndUpdate(
        cid,
        { $set: { products: [] } },
        { new: true }
      );
    } catch (err) {
      return err.message;
    }
  };
}

export default cartManagerMdb;

This is the code of cart.models.js: 
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

and finally this is the code of the routes, carts.routes.js file: 
// --------> IMPORTACIONES DESDE NPM 
import { Router } from "express";

// --------> IMPORTACIONES INTERNAS 
import config from "../config.js";
import cartManagerMdb from "../dao/cartManagerMdb.js";

// --------> VARIABLES GENERALES PARA LAS RUTAS 
const cartRouter = Router();
const manager = new cartManagerMdb();

// --------> ENDPOINTS 

// GET para traer todos los carritos
cartRouter.get("/", async (req, res) => {
  try {
    const allCarts = await manager.getAllCarts();

    res.status(200).send({ status: "GET", playload: allCarts });
  } catch (error) {
    res.status(500).send({ status: "error", error: error.message });
  }
});

// POST para agregar carritos
cartRouter.post("/addCart/:user/:pid", async (req, res) => {
  const user = req.params.user;
  const productId = req.params.pid;

  try {
    const newCart = await manager.addCart(user, productName);
    console.log(newCart);
    res.status(200).send({ origin: config.SERVER, playload: newCart });
  } catch (error) {
    res.status(500).send({ status: "error", error: error.message });
  }
});

// PUT para actualizar carritos
// actualizar el carrito con un arreglo de productos con el formato especificado arriba.
cartRouter.put("/:cid", async (req, res) => {
  const cartId = req.params.cid;
  try {
    const cart = await manager.updateCartFormat(cartId);
    res.status(200).send({ origin: config.SERVER, playload: cart });
  } catch (error) {
    res.status(500).send({ status: "error", error: error.message });
  }
});

// poder actualizar SÓLO la cantidad de ejemplares del producto por cualquier cantidad pasada desde req.body
cartRouter.put("/:cid/products/:pid", async (req, res) => {
  try {
    res.status(200).send({ status: "PUT" });
  } catch (error) {
    res.status(500).send({ status: "error", error: error.message });
  }
});

// DELETE para eliminar el producto seleccionado del carrtito seleccionado
cartRouter.delete("/:cid/products/:pid", async (req, res) => {
  const cartId = req.params.cid;
  const productId = req.params.pid;

  try {
    const cartUpdate = await manager.deleteProduct(cartId, productId);

    res.status(200).send({ origin: config.SERVER, playload: cartUpdate });
  } catch (error) {
    res.status(500).send({ status: "error", error: error.message });
  }
});

// DELETE para eliminar todos los productos del carrito
cartRouter.delete("/:cid", async (req, res) => {
  const cartId = req.params.cid;

  try {
    const empityCart = manager.deleteAllProducts(cartId);
    res.status(200).send({ origin: config.SERVER, playload: empityCart });
  } catch (error) {
    res.status(500).send({ status: "error", error: error.message });
  }
});


export default cartRouter;


and i try to do the previous with the function updateQuantity but i am lost, so i need you to guide me, first just give me some recomendations to try to founde the way to fix this, and if I can't fix, you can show me some code recomendations
 */
