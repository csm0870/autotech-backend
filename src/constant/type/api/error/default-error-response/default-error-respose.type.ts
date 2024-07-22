export type DefaultErrorResponse<Data> = {
    code: number;
    message: string;
    data?: Data;
}