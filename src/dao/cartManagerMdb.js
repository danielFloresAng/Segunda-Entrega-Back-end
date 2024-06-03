import cartsModel from "./models/carts.models.js";
import productsModel from "./models/products.models.js";
// import productManagerMdb from "./productManager.mdb.js";
// const product = new productManagerMdb()

// const product = productsModel;

const productPop = async () => {
  await cartsModel.populate({ path: "products._id", model: productsModel });
};

class cartManagerMdb {
  constructor() {
    this.carts = cartsModel;
  }

  getAllCarts = async () => {
    return await this.carts.find().lean();
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
