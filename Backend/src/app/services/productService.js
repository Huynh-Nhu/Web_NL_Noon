const Category = require("../models/Category");
const ImageProducts = require("../models/ImageProducts");
const ProductDetails = require("../models/ProductDetails");
const Products = require("../models/Products");

class ProductService {
  async findNamedProduct (nameProduct){
    try {
        const product = await Products.findOne({nameProduct: nameProduct})
        return product
    } catch (error) {
        throw new Error(error)
    }
}
  async createProductDetail(productDetailData) {
    try {
      const productDetails = new ProductDetails(productDetailData);
      const createProductDetail = await productDetails.save();
      return createProductDetail;
    } catch (error) {
      throw new Error(error);
    }
  }
  async createImageProduct(imageData) {
    try {
      const imageProduct = new ImageProducts(imageData);
      const createImageProduct = await imageProduct.save();
      return createImageProduct;
    } catch (error) {
      throw new Error(error);
    }
  }
  async brandOfProductDetails(categoryId) {
    try {
      const category = await Category.findById(categoryId).populate('codeBrand');
      return category
    } catch (error) {
      throw new Error(error);
    }
  }
  async createProduct(productData) {
    try {
      const product =new Products(productData);
      const createProduct = await product.save();
      return createProduct;
    } catch (error) {
      throw new Error(error);
    }
  }
  async getAllProducts(categoryId) {
    try {
      const allProduct = await Products.find({idCategory: categoryId})
        .populate('idCategory')
        .populate('idImageProduct')
        .populate('idProductDetails')
      return allProduct;
    } catch (error) {
      throw new Error(error);
    }
  }
  async getOneProduct(idProduct) {
    try {
      const product = await Products.findById(idProduct)
      .populate('idImageProduct')
      .populate('idProductDetails');
      return product

    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }

  async updateProduct  (productId, updatedData) {
    try {
      const product = await Products.findById(productId);
      if (!product) {
        throw new Error("Sản phẩm không tồn tại");
      }
  
      Object.assign(product, updatedData);
      await product.save();
    } catch (error) {
      throw error;
    }
  };
  
}

module.exports = new ProductService();
