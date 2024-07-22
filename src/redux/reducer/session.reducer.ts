import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
    id: number;
    email: string;
    firstName?: string;
    lastName?: string;
    group: {
        id: number;
        name: string;
    };
}

interface SessionState {
    user: User | null;
}

const initialState: SessionState = {
    user: null
}

export const sessionSlice = createSlice({
    name: 'session',
    initialState,
    reducers: {
        setMe: (state, action) => {
            state.user = action.payload.user;
        },
        login: (state, action: PayloadAction<{ user: User, token: string }>) => {
            state.user = action.payload.user;
            localStorage.setItem('AccessToken', action.payload.token);
        },
        logout: (state) => {
            state.user = null;
            localStorage.removeItem('AccessToken');
        }
    }
});

export const {
    setMe,
    login,
    logout
} = sessionSlice.actions;