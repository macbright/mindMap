import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { usersApi } from "./services/users";
import { shapesApi } from "./services/shapes";
import { documentApi} from "./services/document";
import { canvasElementsSlice } from "./slice/canvasElement";


const apiMiddleware = [
  usersApi.middleware,
  shapesApi.middleware,
  documentApi.middleware,
]

export const store = configureStore({
  reducer: {
    [usersApi.reducerPath]: usersApi.reducer,
    [shapesApi.reducerPath]: shapesApi.reducer,
    [documentApi.reducerPath]: documentApi.reducer,
    [canvasElementsSlice.name]: canvasElementsSlice.reducer,
  },
  middleware: (getDefaultMiddiware) =>
    getDefaultMiddiware().concat(apiMiddleware),
});

setupListeners(store.dispatch);