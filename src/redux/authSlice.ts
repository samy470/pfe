import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type UserRole = "admin" | "publisher" | "customer" | null;

interface AuthState {
    role: UserRole;
    username: string | null;
    isLoggedIn: boolean;
}

const initialState: AuthState = {
    role: null,
    username: null,
    isLoggedIn: false,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<{ role: UserRole; username: string }>) => {
            state.role = action.payload.role;
            state.username = action.payload.username;
            state.isLoggedIn = true;
        },
        logout: (state) => {
            state.role = null;
            state.username = null;
            state.isLoggedIn = false;
        },
    },
});

export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer;
