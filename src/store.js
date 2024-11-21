import { configureStore } from "@reduxjs/toolkit";
import productReducer from './slice'

const store = configureStore({
    reducer: {
        products: productReducer
    },
});

export default store;
