import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cartItems: [],
    cartTotalQuantity: 0 ,
    cartTotalAmount: 0,
};

const cartSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        addtoCart: (state, action) => {
            const itemIndex = state.cartItems.findIndex(
                item => item.id === action.payload.id
            )
            if (itemIndex >= 0) {

            } else {
                state.cartItems[itemIndex].cartQuantity += 1
            }
        }
    }, 
    extraReducers: {}

});

export default cartSlice.reducer;