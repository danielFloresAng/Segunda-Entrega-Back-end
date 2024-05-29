import { Router } from "express";

import productManagerMdb from "../dao/productManager.mdb.js";
import config from "../config.js";

const productsRouter = Router();
const manager = new productManagerMdb();

//GET para traer todos los productos
productsRouter.get("/", async (req, res) => {
  try {
    const allProducts = await manager.getAllProducts();

    res.status(200).send({ origin: config.SERVER, playload: allProducts });
  } catch (error) {
    res.status(500).send({ origin: config.SERVER, error: error.message });
  }
});

//GET para filtrar productos por ID
productsRouter.get("/:pid", async (req, res) => {
  let id = req.params.pid;

  try {
    const filter = await manager.getProductsById(id);

    res.status(200).send({ origin: config.SERVER, playload: filter });
  } catch (error) {
    res.status(500).send({ origin: config.SERVER, error: error.message });
  }
});
//POST para agregar productos
productsRouter.post("/newProduct", async (req, res) => {
  const productBody = req.body;

  try {
    await manager.addProducts(productBody);
    const products = await manager.getAllProducts();

    res.status(200).send({ origin: config.SERVER, playload: products });
  } catch (error) {
    res.status(500).send({
      origin: config.SERVER,
      error: `Error al crear producto: ${error.message}`,
    });
  }
});
//PUT para actualizar productos por ID
productsRouter.put("/updateProduct/:pid", async (req, res) => {
  let id = req.params.pid;
  const updateBody = req.body;

  try {
    await manager.updateProduct(id, updateBody);
    const products = await manager.getAllProducts();

    res.status(200).send({ origin: config.SERVER, playload: products });
  } catch (error) {
    res.status(500).send({ origin: config.SERVER, error: error.message });
  }
});

//DELETE para eliminar productos por ID
productsRouter.delete("/deleteProduct/:pid", async (req, res) => {
  const itemID = req.params.pid;

  try {
    await manager.deleteProduct(itemID);
    const products = await manager.getAllProducts();
    res.status(200).send({ status: "on", playload: products });
  } catch (error) {
    res.status(500).send({ origin: config.SERVER, error: error.message });
  }
});

export default productsRouter;
