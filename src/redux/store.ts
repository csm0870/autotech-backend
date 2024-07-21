import {
  configureStore
} from "@reduxjs/toolkit";
import { alertMessageSlice } from "./reducer/alert-message.reducer";

export const store = configureStore({
  reducer: {
    alertMessage: alertMessageSlice.reducer
  }
});

export type RootState = ReturnType<typeof store.getState>;