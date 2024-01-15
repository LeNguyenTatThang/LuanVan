import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
    product: null,
    info: null,
    products: [],
    category: [],
    count: [],
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
        TOGGLE_CHECKBOX: (state, action) => {
            const { productId, isChecked } = action.payload;
            const updatedCart = state.cart.map((item) =>
                item.id === productId ? { ...item, isChecked } : item
            );
            return {
                ...state,
                cart: updatedCart,
            };
        },
        ADD_DATA: (state, action) => {
            const products = action.payload;

            // Ensure that state.count is defined
            const currentCount = state.count || [];

            // Loop through each product in the array
            const updatedCount = products.reduce((acc, product) => {
                // Check if Item is in cart already
                const inCart = currentCount.find((item) => item.id === product.id);

                if (inCart) {
                    // If the item is already in the cart, update its quantity
                    return acc.map((item) =>
                        item.id === product.id ? { ...item, qty: item.qty + product.qty } : item
                    );
                } else {
                    // If the item is not in the cart, add it
                    return [...acc, { ...product }];
                }
            }, currentCount);

            return {
                ...state,
                count: updatedCount,
            };
        },
    },
});

export const {
    ADD_TO_CART,
    REMOVE_FROM_CART,
    REMOVE_ALL,
    TOGGLE_CHECKBOX,
    ADD_DATA
} = userCard.actions;

export default userCard.reducer;