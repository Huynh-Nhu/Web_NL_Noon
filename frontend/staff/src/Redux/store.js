// chứa toàn bô các reduces
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReduce from "./authSlice";
import userReduce from "./userSlice";
import brandReduce from "./brandSlice"
import categoryReduce from "./categorySlice";
import ProductReduce from "./productSlice"
import orderReduce from "./orderSlice"
import shipperReduce from "./shipperSlice";
import orderShipper from "./orderShipper";
import customerReduce from "./customerSlice";
import storage from "redux-persist/lib/storage";

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

const persistConfig = {
  key: "root",
  version: "1",
  storage,
};
const rootReducer = combineReducers({
  auth: authReduce,
  user: userReduce,
  brands: brandReduce,
  category: categoryReduce,
  products: ProductReduce,
  order: orderReduce,
  shipper: shipperReduce,
  delivery: orderShipper,
  customer: customerReduce,

});
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export let persistor = persistStore(store);