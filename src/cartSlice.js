import { createSlice } from "@reduxjs/toolkit";

// Pocetno stanje korpe
const initialState = {
    cartItems: JSON.parse(localStorage.getItem("cartItems")) || [], // Lista proizvoda u korpi (ucitana iz localStorage ili prazna)
    cartTotalQuantity: 0, // Ukupan broj proizvoda
    cartTotalAmount: 0, // Ukupna cena svih proizvoda 
};

// Slice za korpu
const cartSlice = createSlice({
    name: 'products', // Identifikator slic-a
    initialState, // Pocetno stanje
    reducers: {
        // Reducer za dodavanje proizvoda u korpu
        addtoCart: (state, action) => {
            // Provera da li proizvod vec postoji u korpi
            const itemIndex = state.cartItems.findIndex(
                item => item.id === action.payload.id
            );
            if (itemIndex >= 0) {
                // Ako proizvod vec postoji, povecavamo kolicinu
                state.cartItems[itemIndex].cartQuantity += 1;
            } else {
                // Ako proizvod ne postoji, dodajemo ga u korpu sa kolicinom 1
                const tempProduct = { ...action.payload, cartQuantity: 1 };
                state.cartItems.push(tempProduct);
            }
            // Azuriramo localStorage nakon svake izmene korpe
            localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
        },
        removeFromCart: (state, action) => {
            const { product, isRemoveAll } = action.payload;

            if (isRemoveAll) {
                // Uklanjamo sve instance proizvoda iz korpe
                state.cartItems = state.cartItems.filter(item => item.id !== product.id);
            } else {
                // Pronalazak proizvoda
                const itemIndex = state.cartItems.findIndex(item => item.id === product.id);

                if (itemIndex >= 0) {
                    if (state.cartItems[itemIndex].cartQuantity > 1) {
                        // Smanjujemo kolicinu za 1
                        state.cartItems[itemIndex].cartQuantity -= 1;
                    } else {
                        // Uklanjanje proizvoda ako je kolicina 1
                        state.cartItems = state.cartItems.filter(item => item.id !== product.id);
                    }
                }
            }
            // Azuriramo localStorage nakon svake izmene korpe
            localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
        },
    },
});

// Ekspozicija akcija i reducera za upotrebu u ostatku aplikacije
export const { addtoCart, removeFromCart } = cartSlice.actions; // Ekspozicija akcija
export default cartSlice.reducer; // Export reducer-a za povezivanje sa `store`