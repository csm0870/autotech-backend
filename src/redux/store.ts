import {
  configureStore
} from "@reduxjs/toolkit";
import { alertMessageSlice } from "./reducer/alert-message.reducer";
import { sessionSlice } from "./reducer/session.reducer";
import { registrationSlice } from "./reducer/registration.reducer";

export const store = configureStore({
  reducer: {
    alertMessage: alertMessageSlice.reducer,
    session: sessionSlice.reducer,
    registration: registrationSlice.reducer
  }
});

export type RootState = ReturnType<typeof store.getState>;