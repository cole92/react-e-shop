import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getProductsAsync = createAsyncThunk(
    "products/getProductsAsync", // Tip akcije
    async () => {
        const response = await fetch(
            "https://mocki.io/v1/0a8a74dd-c57e-4fa3-8eb0-f20a352e9ce1"  // API URL
        );
        if (response.ok) {
            const products = await response.json(); // Pretvaranje odgovora u JSON
            return products; // `payload` u slucaju uspeha
        }
    }
);

const productSlice = createSlice({
    initialState: {
        list: [], // Prazan niz za listu proizvoda
        status: null, // Pocetno stanje statusa (nema statusa)
    },

    reducers: {}, // Mesto za sinhrone akcije (trenutno prazno)
    extraReducers: {
        // Obrada asinhronih akcija
        [getProductsAsync.pending]: (state, action) => {
            state.status = "loading"; // Promena statusa na "loading"
        },
        [getProductsAsync.fulfilled]: (state, { payload }) => {
            state.list = payload; // Punjenje liste proizvoda
            state.status = "success"; // Promena statusa na "success"
        },
        [getProductsAsync.rejected]: (state, action) => {
            state.status = "failed";  // Promena statusa na "failed" ako API poziv nije uspesan
        },
    },
});

export default productSlice.reducer