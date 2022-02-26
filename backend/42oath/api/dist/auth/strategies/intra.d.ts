import { AuthentificationProvider } from '../services/auth/auth';
declare const IntraStrategy_base: new (...args: any[]) => any;
export declare class IntraStrategy extends IntraStrategy_base {
    private readonly authService;
    constructor(authService: AuthentificationProvider);
    validate(accessToken: string, refreshToken: string, profile: any): Promise<any>;
}
export {};
