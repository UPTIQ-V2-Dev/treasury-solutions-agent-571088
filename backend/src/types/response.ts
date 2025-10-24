export interface TokenResponse {
    token: string;
    expires: string | Date;
}

export interface AuthTokensResponse {
    access: TokenResponse;
    refresh: TokenResponse;
}
