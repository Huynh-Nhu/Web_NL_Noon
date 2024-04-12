const ImageProducts = require("../models/ImageProducts");
const productService = require("../services/productService");
const Products = require("../models/Products");
const ProductDetails = require("../models/ProductDetails");
const CategoryService = require("../services/CategoryService");
const { ObjectId } = require("mongoose").Types;
const productController = {
  addProduct: async (req, res) => {
    try {
      const {
        idCategory,
        nameProduct,
        sizeProduct,
        imageProduct,
        quantityProduct,
        decriptionProduct,
        nameCategoryDetail,
        brandChonse,
      } = req.body;

      const existingCategory = await CategoryService.findIdCategory(idCategory);
      if (existingCategory) {
        const existringProduct = await productService.findNamedProduct(
          nameProduct
        );
        if (existringProduct) {
          return res.status(200).json({ message: "Sản phẩm này đã tồn tại" });
        }
        const productDetails = new ProductDetails({
          descriptionProducts: decriptionProduct,
          sizeProducts: sizeProduct,
          quantityProducts: quantityProduct,
        });
        const saveProductDetails = await productService.createProductDetail(
          productDetails
        );
        const image = new ImageProducts({
          nameImageProduct: imageProduct,
        });
        const saveImage = await productService.createImageProduct(image);

        const product = new Products({
          idCategory: idCategory,
          idImageProduct: saveImage._id,
          categoryDetailChosen: nameCategoryDetail,
          idProductDetails: saveProductDetails._id,
          nameProduct: nameProduct,
          brandChonse: brandChonse,
        });
        const saveProducts = await productService.createProduct(product);
        // console.log(saveProducts);
        return res
          .status(200)
          .json({ message: "Thêm sản phẩm thành công", saveProducts });
      } else {
        return res.status(200).json({ message: "Không có loại sản phẩm này" });
      }
    } catch (error) {
      console.log(error);
      return res.status(200).json({ message: "Thêm sản phẩm thất bại" });
    }
  },
  getAllBrandOfProduct: async (req, res) => {
    try {
      const categoryId = req.query.categoryId;
      const allBrandOfProduct = await productService.brandOfProductDetails(
        categoryId
      );
      const brands = allBrandOfProduct.codeBrand.map((brand) => {
        return {
          nameBrand: brand.nameBrand,
          codeBrand: brand.codeBrand,
        };
      });
      return res.status(200).json(brands);
    } catch (error) {
      return res.status(400).json(error);
    }
  },
  getAllProduct: async (req, res) => {
    try {
      const categoryId = req.query.categoryId;
      const products = await productService.getAllProducts(categoryId);
      return res.status(200).json(products);
    } catch (error) {
      return res.status(400).json(error);
    }
  },
  updateProduct: async (req, res) => {
    try {
      const {
        idProduct,
        idImageProduct,
        idProductDetails,
        nameProduct,
        sizeProduct,
        imageProduct,
        decriptionProduct,
        brandChonse,
      } = req.body;
  
      const product = await productService.getOneProduct(idProduct);
      if (!product) {
        return res.status(404).json({ message: "Sản phẩm không tồn tại" });
      }
  
      // Cập nhật thông tin sản phẩm
      await productService.updateProduct(idProduct, {
        nameProduct,
        brandChonse,
      });
  
      // Cập nhật thông tin chi tiết sản phẩm
      await ProductDetails.findOneAndUpdate(
        { _id: idProductDetails },
        {
          sizeProducts: sizeProduct,
          descriptionProducts: decriptionProduct,
        }
      );
  
      // Cập nhật thông tin hình ảnh sản phẩm
      await ImageProducts.findOneAndUpdate(
        { _id: idImageProduct },
        {
          nameImageProduct: imageProduct,
        }
      );
  
      return res.status(200).json({ message: "Cập nhật thành công" });
    } catch (error) {
      console.log(error);
      return res.status(400).json(error);
    }
  },

  deleteProduct: async (req, res) => {
    try {
      const { idProduct } = req.body;
      const product = await productService.getOneProduct(idProduct);
      if (product) {
        product.state = false;
        await product.save();
        // console.log(product);
      }
    } catch (error) {
      console.log(error);
    }
  },
  resetProduct: async (req, res) => {
    try {
      const { idProduct } = req.body;
      const product = await productService.getOneProduct(idProduct);
      if (product) {
        product.state = true;
        await product.save();
        // console.log(product);
      }
    } catch (error) {
      console.log(error);
    }
  },
  deleteDetailProduct: async (req, res) => {
    try {
      const { idProduct, idSize } = req.body;
      const updateProductDetails = await ProductDetails.findOneAndUpdate(
        {
          _id: idProduct,
          "sizeProducts._id": idSize,
        },
        {
          $set: {
            "sizeProducts.$.state": false,
          },
        },
        { new: true }
      );
    } catch (error) {
      console.log(error);
    }
  },
  resetDetailProduct: async (req, res) => {
    try {
      const { idProduct, idSize } = req.body;
      const updateProductDetails = await ProductDetails.findOneAndUpdate(
        {
          _id: idProduct,
          "sizeProducts._id": idSize,
        },
        {
          $set: {
            "sizeProducts.$.state": true,
          },
        },
        { new: true }
      );
    } catch (error) {
      console.log(error);
    }
  },
  getAll: async (req, res) => {
    try {
      const product = await Products.find()
        .populate("idCategory")
        .populate("idImageProduct")
        .populate("idProductDetails");

      return res.status(200).json(product);
    } catch (error) {
      console.log(error);
    }
  },

  getProductDetail: async (req, res) => {
    try {
      const id = req.query.id;
      const productDetail = req.query.productDetail;
      const product = await Products.findById(id)
      .populate("idProductDetails")
      .populate("idCategory")
      const products = product.idCategory.nameCategory
      // const filter = product.idProductDetails.sizeProducts.filter((pro) => pro._id === productDetail)
      // console.log(filter);
    
      return res.status(200).json({product, products});
    } catch (error) {
      console.log(error);
    }
  },
};

module.exports = productController;
