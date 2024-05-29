import { Router } from "express";

// import data from "../data.js";
// import 

const router = Router();

router.get("/products", (req, res) => {
  const data = ["-"];
  res.render("products", { data: data });
});
export default router;
