import { Router } from "express";

// import data from "../data.js";

const router = Router();

router.get("/products", (req, res) => {
  const data = ["-"];
  res.render("products", { data: data });
});
export default router;
