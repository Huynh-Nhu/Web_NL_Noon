import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";

import authReduce from "./authSlice";
import categoryReduce from "./categorySlice"
import productReduce from "./productSlice"
import brandReduce from "./brandSlice"
import detailRedue from "./detailSlice"
import cardReduce from "./cardSlice"
import orderReduce from "./orderSlice";
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
  key: "user",
  version: "1",
  storage,
};

const rootReducer = combineReducers({
  loginCustom: authReduce,
  category: categoryReduce,
  product : productReduce,
  brands : brandReduce,
  detail: detailRedue,
  card : cardReduce,
  order: orderReduce,
  
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
