import axios from "axios";
import {
  getAllBrandFailed,
  getAllBrandStart,
  getAllBrandSuccess,
} from "./brandSlice";
import {
  getAllCateFailed,
  getAllCateStart,
  getAllCateSuccess,
} from "./categorySlice";
import {
  getAllProductFailed,
  getAllProductStart,
  getAllProductSuccess,
} from "./productSlice";
import { shipperSuccess } from "./shipperSlice";

export const getAllBrand = async (dispatch) => {
  dispatch(getAllBrandStart());
  try {
    const res = await axios.get("http://localhost:8080/brand/allBrand");
    dispatch(getAllBrandSuccess(res.data));
  } catch (error) {
    dispatch(getAllBrandFailed());
    console.log(error);
  }
};
export const updateBrand = async (newBrand) => {
  try {
    const res = await axios.post("http://localhost:8080/brand/updateBrand", newBrand)
    return res.data.message
  } catch (error) {
    console.log(error);
  }
}
export const addCategory = async (category) => {
  try {
    const res = await axios.post(
      "http://localhost:8080/category/addCategory",
      category
    );
    return res.data.message;
  } catch (error) {
    console.log(error);
  }
};

export const updatedCategory = async (newCategory) => {
  try {
    const res = await axios.post("http://localhost:8080/category/updateCategory" , newCategory)
    return res.data.message
  } catch (error) {
    console.log(error);
  }
}

export const getAllCategory = async (dispatch) => {
  dispatch(getAllCateStart());
  try {
    const res = await axios.get(
      "http://localhost:8080/category/getAllCategory"
    );
    dispatch(getAllCateSuccess(res.data));
  } catch (error) {
    dispatch(getAllCateFailed());
    console.log(error);
  }
};

export const addProduct = async (product) => {
  try {
    const res = await axios.post(
      "http://localhost:8080/products/addProduct",
      product
    );
    return res.data.message;
  } catch (error) {
    console.log(error);
  }
};

export const getAllProducts = async (categoryId, dispatch) => {
  dispatch(getAllProductStart());
  try {
    const res = await axios.get("http://localhost:8080/products/allProducts", {
      params: { categoryId },
    });
    dispatch(getAllProductSuccess(res.data));
    return res.data;
  } catch (error) {
    dispatch(getAllProductFailed());
    console.log(error);
  }
};

export const getBrandOfProduct = async (categoryId) => {
  try {
    const res = await axios.get(
      "http://localhost:8080/products/getBrandProduct",
      {
        params: { categoryId },
      }
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const updateProduct = async (updateNewProduct) => {
  try {
    const res = await axios.post(
      "http://localhost:8080/products/updateProduct",
      updateNewProduct
    );
 

    return res.data.message;
  } catch (error) {
    console.log(error);
  }
};

export const deleteProduct = async (idProduct) => {
  try {
    const res = await axios.post(
      "http://localhost:8080/products/deleteProduct",
      {idProduct : idProduct}
    );
 

    return res.data.message;
  } catch (error) {
    console.log(error);
  }
};

export const resertProduct = async (idProduct) => {
  try {
    const res = await axios.post(
      "http://localhost:8080/products/resetProduct",
      {idProduct : idProduct}
    );
 

    return res.data.message;
  } catch (error) {
    console.log(error);
  };
};

  export const deleteDetailProduct = async (idProduct, idSize) => {
    try {
      const res = await axios.post(
        "http://localhost:8080/products/deleteDetailProduct",
        {idProduct : idProduct , idSize: idSize}
      );
   
  
      return res.data.message;
    } catch (error) {
      console.log(error);
    }
  };

  export const resetDetailProduct = async (idProduct, idSize) => {
    try {
      const res = await axios.post(
        "http://localhost:8080/products/resetDetailProduct",
        {idProduct : idProduct , idSize: idSize}
      );
   
  
      return res.data.message;
    } catch (error) {
      console.log(error);
    }
  };

  export const getShipper = async (dispatch) => {
    try {
      const res = await axios.get("http://localhost:8080/shipper/getShipper")
      dispatch(shipperSuccess(res.data))
    } catch (error) {
      console.log(error);
    }
  }





