import { AuthentificationProvider } from "../services/auth/auth";
declare const OpenIdStrategy_base: new (...args: any[]) => any;
export declare class OpenIdStrategy extends OpenIdStrategy_base {
    private readonly authService;
    constructor(authService: AuthentificationProvider);
    validate(accessToken: string, refreshToken: string, profile: any): Promise<any>;
}
export {};
