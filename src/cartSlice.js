import { createSlice } from "@reduxjs/toolkit";

// Pocetno stanje korpe
const initialState = {
    cartItems: [], // Lista proizvoda u korpi
    cartTotalQuantity: 0, // Ukupan broj prozvoda
    cartTotalAmount: 0, // Ukupna cena svih proizvoda 
};

// Slice za korpu
const cartSlice = createSlice({
    name: 'products', // Indetifikator slic-a
    initialState, // Poceno stanje
    reducers: {
        // Akcija za dodavanje proizvoda u korpu
        addtoCart: (state, action) => {
            // Provera da li proizvod vec postoji u korpi
            const itemIndex = state.cartItems.findIndex(
                item => item.id === action.payload.id
            )
            if (itemIndex >= 0) {
                 // Ako proizvod vec postoji, povecavamo kolicinu
                state.cartItems[itemIndex].cartQuantity += 1
            } else {
                 // Ako proizvod ne postoji, dodajemo ga u korpu sa kolicinom 1
                const tempProduct = {...action.payload, cartQuantity: 1}
                state.cartItems.push(tempProduct)
            }
        },
        removeFromCart: (state, action) => {
            const { product , isRemoveAll} = action.payload;

            if (isRemoveAll) {
                // Uklanjamo sve proizvode
                state.cartItems = state.cartItems.filter(item => item.id !== product.id);
            } else {
                // Pronalazak prizvoda
                const itemIndex = state.cartItems.findIndex(item => item.id === product.id)

                if(itemIndex >= 0) {
                    if (state.cartItems[itemIndex].cartQuantity > 1) {
                        // Smanjujemo kolicinu za 1
                        state.cartItems[itemIndex].cartQuantity -= 1;
                    } else {
                        // Uklanjanje proizvoda ako je kolicina 1\
                        state.cartItems = state.cartItems.filter(item => item.id !== product.id)
                    }
                }
            }
        }
    }, 
    
});

// Ekspozicija akcija i reducera za upotrebu u ostatku aplikacije
export const { addtoCart, removeFromCart } = cartSlice.actions; // Ekspozicija akcije `addToCart`
export default cartSlice.reducer; // Export reducer-a za povezivanje sa `store`