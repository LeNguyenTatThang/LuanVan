import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLogin: false,
    userInfo: null,

}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        LOGIN_SUCCESS: (state, action) => {
            state.isLogin = true;
            state.userInfo = action.payload;
        },
        LOG_OUT: (state, action) => {
            state.isLogin = false;
            state.userInfo = null;
        },
        UPDATE_USER_INFORMATION: (state, action) => {
            state.userInfo = action.payload;
        }
    }
})

export const { LOGIN_SUCCESS, LOG_OUT, UPDATE_USER_INFORMATION } = userSlice.actions;
export default userSlice.reducer;
