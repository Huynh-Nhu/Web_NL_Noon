import axios from "axios";
import { jwtDecode } from "jwt-decode";
import {refreshTokens} from "../Redux/apiRequest"

export const createAxios = (user,dispatch,stateSuccess) => {
    const newInstance = axios.create();
    newInstance.interceptors.request.use(
        async(config) =>{
          let date = new Date();
          const decodedToken = jwtDecode(user?.accessToken);
          if(decodedToken.exp < date.getTime()/1000){
            console.log(user?.refreshToken);
            const data = await refreshTokens(user?.refreshToken)
            const refreshUser = {
              ...user,
              accessToken: data.accessToken,
              refreshToken: data.refreshToken
            };
            dispatch(stateSuccess(refreshUser));
            config.headers["token"] = "Bearer " + data.accessToken;
          }
          return config;
        },
        (err)  => {
          return Promise.reject(err);
        }
      );
      return newInstance;
}