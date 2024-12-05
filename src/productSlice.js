import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getProductsAsync = createAsyncThunk(
    "products/getProductsAsync", // Tip akcije (identifikator za pracenje akcije)
    async () => {
        const response = await fetch(
            "https://mocki.io/v1/0a8a74dd-c57e-4fa3-8eb0-f20a352e9ce1"  // API URL
        );
        if (response.ok) {
            const products = await response.json(); // Parsiramo odgovor iz API-ja u JSON format
            return products.products; // Vracamo niz proizvoda kao `payload`
        }
    }
);
// Globalne promenljive za pracenje trenutnih opcija sortiranja i filtriranja
export let sortP = ''; // Trenutna vrednost sortiranja (npr. "lowestprice")
export let sizeP = ''; // Trenutna velicina (npr. "M")

// Kreiramo slice za rad sa proizvodima
const productSlice = createSlice({
    name: 'products', // Naziv slice-a (koristi se kao prefiks za akcije)
    initialState: {
        list: [], // Originalni niz proizvoda
        filteredProducts: [], // Niz proizvoda nakon primene filtera i sortiranja
        status: null, // Status API poziva (null, "loading", "success", "failed")
    },
    reducers: {
        // Reducer za sortiranje proizvoda
        sortBy(state, action) {
            sortP = action.payload  // Cuvamo trenutnu vrednost sortiranja globalno

            // Ako postoji vrednost sortiranja, sortiramo proizvode po ceni
            action.payload !== ''
                ? state.filteredProducts.sort((a, b) => (
                    sortP === 'lowestprice' // Sortiramo od najnize ka najvisoj ili obrnuto
                        ? (a.price > b.price) ? 1 : -1
                        : (a.price < b.price) ? 1 : -1
                ))
                // Ako nema sortiranja, sortiramo po originalnom redosledu (po ID-u)
                : state.filteredProducts.sort((a, b) => (a.id > b.id ? 1 : -1));
        },
        // Reducer za filtriranje po velicini
        sizeBy(state, action) {
            sizeP = action.payload // Cuvamo trenutnu vrednost velicine globalno
            // Ako nije odabrana velicina, vracamo sve proizvode
            action.payload.toUpperCase() === ''
                ? state.filteredProducts = [...state.list]
                // Ako je odabrana velicina, filtriramo proizvode po dostupnim velicinama
                : state.filteredProducts = [...state.list].filter((x) =>
                    x.availableSizes.indexOf(action.payload.toUpperCase()) !== -1)
        },
        // Reducer za direktno azuriranje liste proizvoda   
        filterBy(state, action) {
            state.list = action.payload // Postavljamo novu listu proizvoda
        }

    }, // Mesto za asinhrone akcije
    extraReducers: (builder) => {
        builder
            .addCase(getProductsAsync.pending, (state) => {
                state.status = "loading"; // API poziv je u toku
            })
            .addCase(getProductsAsync.fulfilled, (state, { payload }) => {
                state.list = payload; // Azuriramo originalni niz proizvoda
                state.filteredProducts = payload;
                state.status = "success"; // API poziv je uspesan
            })
            .addCase(getProductsAsync.rejected, (state) => {
                state.status = "failed"; // API poziv nije uspesan
            });
    },
});
// Izvoz akcija za sortiranje, filtriranje i azuriranje proizvoda
export const { sortBy, sizeBy, filterBy } = productSlice.actions;
// Izvoz reducera za povezivanje sa globalnim stanjem (store)
export default productSlice.reducer;