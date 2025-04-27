import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { authReducer } from "./auth/slice";
import contactsSliceReducer from "./contacts/slice"; 
import { filtersSliceReducer } from "./filters/slice";

const authPersistConfig = {
  key: "auth",
  storage,
  whitelist: ["token"],
};

export const store = configureStore({
  reducer: {
    contacts: contactsSliceReducer,
    filters: filtersSliceReducer, 
    auth: persistReducer(authPersistConfig, authReducer),
  },
});

export let persistor = persistStore(store);
