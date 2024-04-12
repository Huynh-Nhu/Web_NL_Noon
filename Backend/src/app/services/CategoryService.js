const Category = require('../models/Category')

class CategoryService{
    async findIdCategory (id) {
        try {
            const idCategory = await Category.findById(id);
            return idCategory;
        } catch (error) {
            throw new Error(error)
        }
    }
    async findNamedCategory (nameCategory){
        try {
            const category = await Category.findOne({nameCategory: nameCategory})
            return category
        } catch (error) {
            throw new Error(error)
        }
    }
    async createBrand (CategoryData) {
        try {
            const brand = new Category(CategoryData);
            const createBrand = await brand.save();
            return createBrand
        } catch (error) {
            throw new Error(error)
        }
    }
    async getAllCate () {
        try {
            const allCate = await Category.find()
            return allCate
        } catch (error) {
            throw new Error(error)
        }
    }
}

module.exports = new CategoryService()