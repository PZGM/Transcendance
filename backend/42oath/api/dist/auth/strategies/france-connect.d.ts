import { AuthentificationProvider } from "../services/auth/auth";
declare const FranceConnectStrategy_base: new (...args: any[]) => any;
export declare class FranceConnectStrategy extends FranceConnectStrategy_base {
    private readonly authService;
    constructor(authService: AuthentificationProvider);
    validate(accessToken: string, refreshToken: string, profile: any): Promise<any>;
}
export {};
