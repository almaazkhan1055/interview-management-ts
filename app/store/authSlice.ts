import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
    isAuthenticated: boolean;
    token: string | null;
    role: string | null;
    username: string | null;
}

const initialState: AuthState = {
    isAuthenticated: false,
    token: null,
    role: null,
    username: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (
            state,
            action: PayloadAction<{ token: string; role: string; username: string }>
        ) => {
            state.isAuthenticated = true;
            state.token = action.payload.token;
            state.role = action.payload.role;
            state.username = action.payload.username;
        },
        logoutAction: (state) => {
            state.isAuthenticated = false;
            state.token = null;
            state.role = null;
            state.username = null;
        },
    },
});

export const { login, logoutAction } = authSlice.actions;
export default authSlice.reducer;