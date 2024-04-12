const mongoose = require('mongoose');

const BrandScheme= new mongoose.Schema({
   codeBrand: {
      type: 'string',
      required: true
   },
   nameBrand: {
    type: String,
    required: true
   },
   imgBrand: {
    type: String,
   }


})

module.exports = mongoose.model('Brand',BrandScheme)