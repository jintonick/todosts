import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "./TodoSlice";

const store = configureStore({
  reducer: {
    todo: todoReducer,
  },
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export default store ;