import { Router } from "express";

import cartManagerMdb from "../dao/cartsManagerMdb.js";
import config from "../config.js";

const cartRouter = Router();
const manager = new cartManagerMdb();

// GET para traer todos los carritos
cartRouter.get("/", async (req, res) => {
  try {
    res.status(200).send({ status: "GET" });
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
  try {
    res.status(200).send({ status: "PUT" });
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

// DELETE para eliminar carritos
//eliminar del carrito el producto seleccionado.
cartRouter.delete("/:cid/products/:pid", async (req, res) => {
  try {
    res.status(200).send({ status: "DELETE" });
  } catch (error) {
    res.status(500).send({ status: "error", error: error.message });
  }
});
// deberá eliminar todos los productos del carrito 
cartRouter.delete("/:cid", async (req, res) => {
  try {
    res.status(200).send({ status: "DELETE" });
  } catch (error) {
    res.status(500).send({ status: "error", error: error.message });
  }
});

// Esta vez, para el modelo de Carts, en su propiedad products, el id de cada producto generado dentro del array tiene que hacer referencia al modelo de Products. Modificar la ruta /:cid para que al traer todos los productos, los traiga completos mediante un “populate”. De esta manera almacenamos sólo el Id, pero al solicitarlo podemos desglosar los productos asociados.
export default cartRouter;
