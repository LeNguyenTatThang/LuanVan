import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
    product: null,
    info: null,
    products: [],
    category: [],
    size: [],
    cart: [],
    search: [],
};

const userCard = createSlice({
    name: "shop",
    initialState: INITIAL_STATE,

    reducers: {
        ADD_TO_CART: (state, action) => {
            const product = action.payload;
            // Check if Item is in cart already
            const inCart = state.cart.find((item) =>
                item.id === product.id ? true : false
            );
            return {
                ...state,
                cart: inCart
                    ? state.cart.map((item) =>
                        item.id === product.id
                            ? { ...item, qty: item.qty + product.qty }
                            : item
                    )
                    : [...state.cart, { ...product }],
            };
        },
        REMOVE_FROM_CART: (state, action) => {
            const product = action.payload;
            return {
                ...state,
                cart: state.cart.filter((item) => (
                    item.id !== product.id

                )),
            };
        },
        REMOVE_ALL: (state, action) => {
            return {
                ...state,
                cart: [],
            };
        },

    },
});

export const {
    ADD_TO_CART,
    REMOVE_FROM_CART,
    REMOVE_ALL
} = userCard.actions;

export default userCard.reducer;