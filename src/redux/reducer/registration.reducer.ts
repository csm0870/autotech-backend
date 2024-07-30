import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type RegistrationState = {
    companyRegistrationData: {
        email: string | null;
        password: string | null;
        name: string | null;
        shortDescription: string | null;
        headquarters: string | null;
        taxNumber: string | null;
        webSite: string | null;
        facebook: string | null;
        logo: FileList | null;
        gdpr: FileList | null;
        contactName: string | null;
        contactEmail: string | null;
        contactPhone: string | null;
        contactPosition: string | null;
    }
}

const initialState: RegistrationState = {
    companyRegistrationData: {
        email: null,
        password: null,
        name: null,
        shortDescription: null,
        headquarters: null,
        taxNumber: null,
        webSite: null,
        facebook: null,
        logo: null,
        gdpr: null,
        contactName: null,
        contactEmail: null,
        contactPhone: null,
        contactPosition: null
    }
}

export const registrationSlice = createSlice({
    name: 'registration',
    initialState,
    reducers: {
        setCompanyRegistrationData: (state, action: PayloadAction<{
            email?: string | null;
            password?: string | null;
            name?: string | null;
            shortDescription?: string | null;
            headquarters?: string | null;
            taxNumber?: string | null;
            webSite?: string | null;
            facebook?: string | null;
            logo?: FileList | null;
            gdpr?: FileList | null;
            contactName?: string | null;
            contactEmail?: string | null;
            contactPhone?: string | null;
            contactPosition?: string | null;
        }>) => {
            state.companyRegistrationData = {
                ...state.companyRegistrationData,
                ...action.payload
            };
        }
    }
});

export const {
    setCompanyRegistrationData
} = registrationSlice.actions;