import { Router } from "express";

import productManagerMdb from "../dao/productManager.mdb.js";
import config from "../config.js";

const productsRouter = Router();
const manager = new productManagerMdb();

/**
  modificar el método GET / para que cumpla con los siguientes puntos:


// Deberá poder recibir por query params un limit (opcional), una page (opcional), un sort (opcional) y un query (opcional)

- limit permitirá devolver sólo el número de elementos solicitados al momento de la petición, en caso de no recibir limit, éste será de 10.

- page permitirá devolver la página que queremos buscar, en caso de no recibir page, ésta será de 1

- query, el tipo de elemento que quiero buscar (es decir, qué filtro aplicar), en caso de no recibir query, realizar la búsqueda general

- sort: asc/desc, para realizar ordenamiento ascendente o descendente por precio, en caso de no recibir sort, no realizar ningún ordenamiento
 
 */
//GET para traer todos los productos
productsRouter.get("/", async (req, res) => {
  try {
    const allProducts = await manager.getAllProducts();

    res.status(200).send({
      origin: config.SERVER,
      playload: allProducts,
      totalPages: "Total de páginas",
      prevPage: "Página anterior",
      nextPage: "Página siguiente",
      page: "Página actual",
      hasPrevPage: "Indicador para saber si la página previa existe",
      hasNextPage: "Indicador para saber si la página siguiente existe.",
      prevLink: "Link directo a la página previa (null si hasPrevPage=false)",
      nextLink:
        "Link directo a la página siguiente (null si hasNextPage=false)",
    });
  } catch (error) {
    res.status(500).send({ origin: config.SERVER, error: error.message });
  }
});

/*
---> Se deberá poder buscar productos por categoría o por disponibilidad, y se deberá poder realizar un ordenamiento de estos productos de manera ascendente o descendente por precio.
*/
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
