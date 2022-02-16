import { Response } from 'express';
export declare class AuthController {
    login(): void;
    login_fc(): void;
    login_oi(): void;
    redirect(res: Response): void;
    redirect_oi(res: Response): void;
    redirect_fc(res: Response): void;
    status(): string;
    logout(): void;
}
