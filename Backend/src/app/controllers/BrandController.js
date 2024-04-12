const Brand = require("../models/Brand");
const brandService = require("../services/BrandService");
const randomstring = require("randomstring");
const Category = require("../models/Category");
const CategoryService = require("../services/CategoryService");
const brandController = {
  addBrand: async (req, res) => {
    try {
      const { nameBrand, imgBrand } = req.body;
      const brand = await brandService.findNamedBrand(nameBrand);
      if (brand) {
        return res.status(200).json({ message: "Brand đã tồn tại" });
      }
      const imgUrl = imgBrand.thisUrl;
      const img = imgUrl.toString();
      let characters = randomstring.generate(4);

      let existingBrand = await Brand.findOne({ codeBrand: characters });
      while (existingBrand) {
        characters = randomstring.generate(4);
        existingBrand = await Brand.findOne({ codeBrand: characters });
      }
      const newBrand = new Brand({
        codeBrand: characters,
        nameBrand: nameBrand,
        imgBrand: img,
      });
      const newBrands = await brandService.createBrand(newBrand);
      console.log(newBrands);
      return res
        .status(200)
        .json({ message: "Thêm thành công Brand sản phẩm", Brand: newBrands });
    } catch (error) {
      return res.status(400).json({ message: "Không thể thêm Brand" });
    }
  },
  getAllBrand: async (req, res) => {
    try {
      // const {isID} = req.body
      // console.log(isID);
      const allBrand = await brandService.findAllBrand();
      return res.status(200).json(allBrand);
    } catch (error) {
      console.log(error);
    }
  },
  updateBrand: async (req, res) => {
    try {
      const { nameBrand, imgBrand, idBrand } = req.body;
      let img = "";
      const brand = await Brand.findById(idBrand);
      if (brand) {
        if (typeof imgBrand === "object") {
          img = imgBrand.toString();
        } else {
          img = imgBrand;
        }

        (brand.nameBrand = nameBrand), (brand.imgBrand = img);

        await brand.save();
        return res.status(200).json({ message: "Cập nhật thành công" });
      }
    } catch (error) {
      // return res.status(200).json({message: "không cập nhật thành công"})

      console.log(error);
    }
  },
  getBrand: async (req, res) => {
    try {
      const categoryId = req.query.isID;
      const brand = await Category.findById(categoryId).populate("codeBrand");
      return res.status(200).json(brand);
    } catch (error) {
      console.log(error);
    }
  },
};

module.exports = brandController;
