const Brand = require('../models/Brand')
class BrandService {
    async createBrand (BrandData) {
        try {
            const brand = new Brand(BrandData);
            const createBrand = await brand.save();
            return createBrand
        } catch (error) {
            throw new Error(error)
        }
    }
    async findNamedBrand (nameBrand){
        try {
            const brand = await Brand.findOne({nameBrand: nameBrand})
            return brand
        } catch (error) {
            throw new Error(error)
        }
    }
    async findAllBrand () {
        try {
            const allBrand = await Brand.find();
            return allBrand
        } catch (error) {
            throw new Error(error)
        }
    }
   
}

module.exports = new BrandService()