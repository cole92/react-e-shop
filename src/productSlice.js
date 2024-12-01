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

export let sortP = '';
export let sizeP = '';

const productSlice = createSlice({
    name: 'products',
    initialState: {
        list: [], // Prazan niz za listu proizvoda
        filteredProducts: [], // Filtrirani proizvodi
        status: null, // Pocetno stanje statusa
    },
    reducers: {
        sortBy(state, action) {
            sortP = action.payload
            action.payload !== ''
                ? state.filteredProducts.sort((a, b) => (
                    sortP === 'lowestprice'
                        ? (a.price > b.price) ? 1 : -1
                        : (a.price < b.price) ? 1 : -1
                ))
                : state.filteredProducts.sort((a, b) => (a.id > b.id ? 1 : -1));  
        },
        sizeBy(state, action) {
            sizeP = action.payload

            action.payload.toUppperCase() === ''
            ? state.filteredProducts = [...state.list]
            : state.filteredProducts = [...state.list].filter((x) => 
                x.availableSizes.indexOf(action.payload.toUppperCase()) !== -1)
        },   
        filterBy(state, action) {
            state.list = action.payload
        }

    }, // Mesto za asinhrone akcije
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
export const {sortBy, sizeBy, filterBy} = productSlice.actions;
export default productSlice.reducer;