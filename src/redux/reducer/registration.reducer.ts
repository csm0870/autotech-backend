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
    };
    jobSeekerRegistrationData: {
        lastName: string | null;
        firstName: string | null;
        email: string | null;
        password: string | null;
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
    },
    jobSeekerRegistrationData: {
        lastName: null,
        firstName: null,
        email: null,
        password: null
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
        },

        resetCompanyRegistrationData(state) {
            state.companyRegistrationData.email = null;
            state.companyRegistrationData.password = null;
            state.companyRegistrationData.name = null;
            state.companyRegistrationData.shortDescription = null;
            state.companyRegistrationData.headquarters = null;
            state.companyRegistrationData.taxNumber = null;
            state.companyRegistrationData.webSite = null;
            state.companyRegistrationData.facebook = null;
            state.companyRegistrationData.logo = null;
            state.companyRegistrationData.gdpr = null;
            state.companyRegistrationData.contactName = null;
            state.companyRegistrationData.contactEmail = null;
            state.companyRegistrationData.contactPhone = null;
            state.companyRegistrationData.contactPosition = null;
        },

        setJobSeekerRegistrationData: (state, action: PayloadAction<{
            lastName?: string | null;
            firstName?: string | null;
            email?: string | null;
            password?: string | null;
        }>) => {
            state.jobSeekerRegistrationData = {
                ...state.jobSeekerRegistrationData,
                ...action.payload
            };
        }

    }
});

export const {
    setCompanyRegistrationData,
    resetCompanyRegistrationData,
    setJobSeekerRegistrationData
} = registrationSlice.actions;