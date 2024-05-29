import express from "express";
import handelbars from "express-handlebars";
import mongoose from "mongoose";

import config from "./config.js";
import socketInit from "./sockets.js";
import productsRouter from "./routes/product.routes.js";
import cartRouter from "./routes/cart.routes.js";
import viewsRouter from "./routes/views.routes.js";

const app = express();

const httpInstance = app.listen(config.PORT, async () => {
  await mongoose.connect(config.MONGODB_URI);
});
console.log(
  `Servidor funcionando en puerto ${config.PORT} conectada a ${config.SERVER}`
);

const socketServer = socketInit(httpInstance);

app.set("socketServer", socketServer);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine("handlebars", handelbars.engine());
app.set("views", `${config.DIRNAME}/views`);
app.set("view engine", "handlebars");

app.use("/", viewsRouter);
app.use("api/products", productsRouter);
app.use('api/carts', cartRouter)
app.use("static", express.static(`${config.DIRNAME}/public`));
