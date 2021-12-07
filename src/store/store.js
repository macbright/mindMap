import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { usersApi } from "./services/users";
import { shapesApi } from "./services/shapes";
import { canvasElementsSlice } from "./slice/canvasElement";


const apiMiddleware = [
  usersApi.middleware,
  shapesApi.middleware
]

export const store = configureStore({
  reducer: {
    [usersApi.reducerPath]: usersApi.reducer,
    [shapesApi.reducerPath]: shapesApi.reducer,
    [canvasElementsSlice.name]: canvasElementsSlice.reducer,
  },
  middleware: (getDefaultMiddiware) =>
    getDefaultMiddiware().concat(apiMiddleware),
});

setupListeners(store.dispatch);