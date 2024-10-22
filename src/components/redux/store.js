import { combineReducers, configureStore } from "@reduxjs/toolkit";
import WishlistSlice from './slice/WishlistSlice';
import storage from "redux-persist/lib/storage";
import persistReducer from "redux-persist/es/persistReducer";
import persistStore from "redux-persist/es/persistStore";


const rootReducer = combineReducers({
    whishlist: WishlistSlice,
  });
  
  const persistConfig = {
    key: "root",
    storage,
    version: 1,
  };
  
  const persistedReducer = persistReducer(persistConfig, rootReducer);
  
  const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }),
  });
  
  const persistor = persistStore(store);
  
  export { store, persistor };
  