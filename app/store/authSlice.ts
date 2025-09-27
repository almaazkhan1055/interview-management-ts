import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Role = "admin" | "ta_member" | "panelist" | "" | null;

interface AuthState {
    token: string | null;
    role: Role;
    username: string | null;
}

const initialState: AuthState = {
    token: null,
    role: null,
    username: null,
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        loginSuccess: (state, action: PayloadAction<Omit<AuthState, 'token'> & { token: string }>) => {
            state.token = action.payload.token;
            state.role = action.payload.role;
            state.username = action.payload.username;
        },
        logout: (state) => {
            Object.assign(state, initialState);
        },
    },
});

export const { loginSuccess, logout } = authSlice.actions;

export default authSlice.reducer;