export type LoginSuccessResponse = {
    user: {
        id: number;
        email: string;
        firstName?: string;
        lastName?: string;
        group: {
            id: number;
            name: string;
        }
    },
    accessToken: string;
};