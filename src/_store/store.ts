import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/auth";

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});
export type RootStoreType = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
store.subscribe(() => {
  console.log("changed state", { store });
});

export default store;
