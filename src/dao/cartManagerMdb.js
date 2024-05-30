import cartsModel from "./models/carts.models.js";
import productsModel from "./models/products.models.js";
// import productManagerMdb from "./productManager.mdb.js";
// const product = new productManagerMdb()

const product = productsModel;

class cartManagerMdb {
  constructor() {
    this.cart = cartsModel;
  }

  getAllCarts = async () => {};

  addCart = async (newData, productId) => {
    const productToAdd = await product.findById(productId);
    await this.cart.create({ user: newData.user, products: [productToAdd] });
    console.log(productToAdd)
  };

  getCartById = async (id) => {};

  updateCart = async (id, updProd) => {
    try {
    } catch (err) {
      return err.message;
    }
  };

  deleteCart = async (idDelete) => {
    try {
    } catch (err) {
      return err.message;
    }
  };
}

export default cartManagerMdb;
