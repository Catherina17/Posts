import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action) => {

        },
        logout: (state) => {
            
        },
    }        
})

export const { login, logout, registerUser } = authSlice.actions

export default authSlice.reducer