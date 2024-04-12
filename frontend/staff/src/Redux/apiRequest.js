import axios from "axios";
import CryptoJS from "crypto-js";
import {
  loginFailed,
  loginStart,
  loginSuccess,
  logoutFailed,
  logoutStart,
  logoutSuccess,
  registerFailed,
  registerStart,
  registerSuccess,
} from "./authSlice";
import {
  getUserFailed,
  getUserStart,
  getUserSuccess,
  setPassStart,
  setPassFailed,
  setPassSuccess,
} from "./userSlice";
import { addBrandSuccess } from "./brandSlice";
import { getAllCustomerSuccess } from "./customerSlice";

export const loginStaff = async (user, dispatch, navigate) => {
  dispatch(loginStart());
  try {
    const res = await axios.post("http://localhost:8080/staffs/login", user);
    dispatch(loginSuccess(res.data));
    navigate("/");
    return res.data.message;
  } catch (error) {
    const response = error.response.data.message;
    dispatch(loginFailed(response));
    return response;
  }
};

export const registerStaff = async (user, dispatch, navigate) => {
  dispatch(registerStart());
  try {
    await axios.post("http://localhost:8080/staffs/register", user);
    dispatch(registerSuccess());
    navigate("/login");
  } catch (error) {
    dispatch(registerFailed());
  }
};
export const refreshTokens = async (refreshToken) => {
  try {
    const res = await axios.post("http://localhost:8080/staffs/refresh", {
      refreshToken: refreshToken,
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const getAllStaff = async (accessToken, dispatch, axiosJWT) => {
  dispatch(getUserStart());
  try {
    const res = await axiosJWT.get("http://localhost:8080/staffs/staff", {
      headers: { token: `Bearer ${accessToken}` },
    });
    dispatch(getUserSuccess(res.data));
  } catch (error) {
    dispatch(getUserFailed());
  }
};

export const getAllCustomers = async (dispatch) => {
  try {
    const res = await axios.get(
      "http://localhost:8080/customer/getAllCustomer"
    );
    dispatch(getAllCustomerSuccess(res.data));
  } catch (error) {
    console.log(error);
  }
};

export const updateStaff = async (staff, accessToken, axiosJWT) => {
  try {
    const res = await axiosJWT.post(
      "http://localhost:8080/staffs/updateStaff",
      {
        staff: staff,
      },
      { headers: { token: `Bearer ${accessToken}` } }
    );
  } catch (error) {
    console.log(error);
  }
};

export const LogOut = async (
  dispatch,
  navigate,
  refreshToken,
  accessToken,
  axiosJWT
) => {
  dispatch(logoutStart());
  try {
    const res = await axiosJWT.post(
      "http://localhost:8080/staffs/logout",
      { refreshToken: refreshToken },
      {
        headers: { token: `Bearer ${accessToken}` },
      }
    );
    dispatch(logoutSuccess());
    if (res.data) {
      navigate("/login");
    }
  } catch (error) {
    console.log(error);
    dispatch(logoutFailed());
  }
};

export const setPass = async (user, dispatch, axiosJWT, accessToken) => {
  dispatch(setPassStart());
  try {
    const res = await axiosJWT.post(
      "http://localhost:8080/staffs/setPass",
      { user: user },
      {
        headers: { token: `Bearer ${accessToken}` },
      }
    );
    dispatch(setPassSuccess(res.data));
    console.log(res);
    return {
      status: res.status,
      message: res.data.message
    };
  } catch (error) {
    dispatch(setPassFailed());
    console.log(error);
    return {
      status: error.response.status,
      message: error.response.data.message
    };
  }
};

export const addBrand = async (brand, dispatch) => {
  try {
    const res = await axios.post("http://localhost:8080/brand/add", brand);
    // console.log(res.);
    dispatch(addBrandSuccess(res.data.Brand));
    return res.data.message;
    // console.log(res.data);
  } catch (error) {
    console.log("error addBrand", error);
  }
};

export const uploadFiles = async (files) => {
  if (files) {
    const CLOUD_NAME = "defr8pudf";
    const PRESET_NAME = "ml_default";
    const FOLDER_NAME = "Noon";
    const link = [];
    const product_id = [];
    const api = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload/`;

    const formDataArray = Array.from(files).map((file) => {
      const formData = new FormData();
      formData.append("upload_preset", PRESET_NAME);
      formData.append("folder", FOLDER_NAME);
      formData.append("file", file);
      return formData;
    });
    try {
      const uploadResponse = await Promise.all(
        formDataArray.map((formData) =>
          axios.post(api, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
        )
      );
      uploadResponse.forEach((res) => {
        link.push(res.data.secure_url);
        product_id.push(res.data.public_id);
      });

      const thisUrl = uploadResponse.map((res) => res.data.secure_url);
      const thisId = uploadResponse.map((res) => res.data.public_id);
      return { thisUrl, thisId };
    } catch (error) {
      console.log(error);
    }
  }
};
export const generateSignature = async (publicId, timestamp) => {
  const API_SECRET = "3QEu2YNffZKBksRYXKtfxheQJEw";
  const stringToSign = `public_id=${publicId}&timestamp=${timestamp}${API_SECRET}`;
  const signature = CryptoJS.SHA1(stringToSign).toString(CryptoJS.enc.Hex);
  return signature;
};
export const deleteLoadFiles = async (publicId) => {
  if (publicId && publicId.length > 0) {
    const CLOUD_NAME = "defr8pudf";
    const API_KEY = "313217297644915";

    try {
      await Promise.all(
        publicId.map(async (id) => {
          const timestamp = Math.floor(new Date().getTime() / 1000);
          const signature = await generateSignature(id, timestamp);

          const res = await axios.post(
            `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/destroy`,
            {
              public_id: publicId,
              timestamp,
              api_key: API_KEY,
              signature: signature,
            }
          );
        })
      );
      return "delete successful";
    } catch (error) {
      console.log(error);
    }
  }
};

export const getAccount = async () => {
  try {
    const res = await axios.get("http://localhost:8080/account/getAccount");
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const selectRevenue = async (daySelect) => {
  try {
    const res = await axios.post(
      "http://localhost:8080/account/revenueSelect",
      daySelect
    );
    return res.data.orderRevenue;
  } catch (error) {
    console.log(error);
  }
};
