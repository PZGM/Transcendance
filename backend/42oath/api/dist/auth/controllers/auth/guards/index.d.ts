import { CanActivate, ExecutionContext } from "@nestjs/common";
declare const IntraAuthGuard_base: import("@nestjs/passport").Type<import("@nestjs/passport").IAuthGuard>;
export declare class IntraAuthGuard extends IntraAuthGuard_base {
    canActivate(context: ExecutionContext): Promise<any>;
}
declare const FranceConnectAuthGuard_base: import("@nestjs/passport").Type<import("@nestjs/passport").IAuthGuard>;
export declare class FranceConnectAuthGuard extends FranceConnectAuthGuard_base {
    canActivate(context: ExecutionContext): Promise<any>;
}
declare const OpenIdAuthGuard_base: import("@nestjs/passport").Type<import("@nestjs/passport").IAuthGuard>;
export declare class OpenIdAuthGuard extends OpenIdAuthGuard_base {
    canActivate(context: ExecutionContext): Promise<any>;
}
export declare class AuthentificatedGuard implements CanActivate {
    canActivate(context: ExecutionContext): Promise<boolean>;
}
export {};
