import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getProductsAsync = createAsyncThunk(
    "products/getProductsAsync", // Tip akcije
    async () => {
        const response = await fetch(
            "https://mocki.io/v1/0a8a74dd-c57e-4fa3-8eb0-f20a352e9ce1"  // API URL
        );
        if (response.ok) {
            const products = await response.json(); // Pretvaranje odgovora u JSON
            return products.products; // `payload` u slucaju uspeha
        }
    }
);

const productSlice = createSlice({
    name: 'products',
    initialState: {
        list: [], // Prazan niz za listu proizvoda
        filteredProducts: [],
        status: null, // Pocetno stanje statusa
    },
    reducers: {}, // Mesto za sinhrone akcije
    extraReducers: (builder) => {
        builder
            .addCase(getProductsAsync.pending, (state) => {
                state.status = "loading"; // API poziv je pokrenut
            })
            .addCase(getProductsAsync.fulfilled, (state, { payload }) => {
                state.list = payload; // Punimo listu proizvodima
                state.filteredProducts = payload;
                state.status = "success"; // API poziv je uspesan
            })
            .addCase(getProductsAsync.rejected, (state) => {
                state.status = "failed"; // API poziv nije uspesan
            });
    },
});

export default productSlice.reducer