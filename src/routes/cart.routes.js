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
  const user = req.params.user
  const productId = req.params.pid;

  try {
    const newCart = await manager.addCart(user, productName);
    console.log(newCart)
    res.status(200).send({ origin: config.SERVER, playload: newCart });
  } catch (error) {
    res.status(500).send({ status: "error", error: error.message });
  }
});

// PUT para actualizar carritos
cartRouter.put("/updateCart", async (req, res) => {
  try {
    res.status(200).send({ status: "PUT" });
  } catch (error) {
    res.status(500).send({ status: "error", error: error.message });
  }
});

// DELETE para eliminar carritos
cartRouter.delete("/deleteCart/:cid", async (req, res) => {
  try {
    res.status(200).send({ status: "DELETE" });
  } catch (error) {
    res.status(500).send({ status: "error", error: error.message });
  }
});

export default cartRouter;
