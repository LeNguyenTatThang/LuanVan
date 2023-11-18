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
                    item.size + item._id !== product.size + product._id

                )),
            };
        },
        ADJUST_ITEM_QTY: (state, action) => {
            const product = action.payload;
            return {
                ...state,
                cart: state.cart.map((item) =>
                    item.size + item._id === product.size + product._id
                        ? { ...item, qty: + product.qty }
                        : item
                ),
            };
        },
        LOAD_CURRENT_ITEM: (state, action) => {
            const product = action.payload;
            return {
                ...state,
                product: product,
            };
        },
        ALL_SIZE_PRODUCT: (state, action) => {
            const size = action.payload;
            return {
                ...state,
                size: size,
            };
        },
        LOAD_CATEGORY: (state, action) => {
            const category = action.payload;
            return {
                ...state,
                category: category,
            };
        },
        LOAD_PRODUCTS: (state, action) => {
            const products = action.payload;
            return {
                ...state,
                products: products,
            };
        },
        LOAD_SEARCH: (state, action) => {
            const search = action.payload;
            return {
                ...state,
                search: search,
            };
        },
        CLEAR_CART: (state) => {
            return {
                ...state,
                cart: []
            }
        },
        CLEAR_INFO: (state) => {
            return {
                ...state,
                info: null
            }
        },
        LOAD_INFO: (state, action) => {
            const info = action.payload;
            return {
                ...state,
                info: info,
            };
        },
    },
});

export const {
    ADD_TO_CART,
    REMOVE_FROM_CART,
    ADJUST_ITEM_QTY,
    ALL_SIZE_PRODUCT,
    LOAD_PRODUCTS,
    LOAD_SEARCH,
    LOAD_CURRENT_ITEM,
    LOAD_CATEGORY,
    CLEAR_INFO,
    LOAD_INFO,
    CLEAR_CART,
} = userCard.actions;

export default userCard.reducer;