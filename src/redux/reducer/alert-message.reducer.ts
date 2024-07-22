import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type AlertMessageType = 'success' | 'error' | 'warning' | 'info';

type AlertMessageState = {
    alertMessageText: string | null;
    alertMessageType: AlertMessageType;
    visible: boolean;
}

const initialState: AlertMessageState = {
    alertMessageText: null,
    alertMessageType: 'success',
    visible: false
}

export const alertMessageSlice = createSlice({
    name: 'alertMessage',
    initialState,
    reducers: {
        hideAlertMessage: (state) => {
            state.visible = false;
        },
        showAlertMessage: (state, action: PayloadAction<{ alertMessageText: string, alertMessageType?: AlertMessageType }>) => {
            state.visible = true;
            state.alertMessageText = action.payload.alertMessageText;
            state.alertMessageType = action.payload.alertMessageType ?? 'success';
        }
    }
});

export const {
    hideAlertMessage,
    showAlertMessage
} = alertMessageSlice.actions;