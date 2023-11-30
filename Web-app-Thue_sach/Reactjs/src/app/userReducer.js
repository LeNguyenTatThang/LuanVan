import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLogin: false,
    userInfo: null
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        LOGIN_SUCCESS: (state, action) => {
            state.isLogin = true;
            state.userInfo = action.payload;
            return state
        },
        LOG_OUT: (state, action) => {
            state.isLogin = false
            state.userInfo = null;
            return state
        }
    }
})

export const { LOGIN_SUCCESS, LOG_OUT } = userSlice.actions;
export default userSlice.reducer;