import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Injectable()
export class IntraAuthGuard extends AuthGuard('42') {
    async canActivate(context: ExecutionContext): Promise<any> {
        const activate = (await super.canActivate(context)) as boolean;
        const request = context.switchToHttp().getRequest();
        await super.logIn(request);
        return activate;
    }
}

@Injectable()
export class FranceConnectAuthGuard extends AuthGuard('france-connect') {
    async canActivate(context: ExecutionContext): Promise<any> {
        const activate = (await super.canActivate(context)) as boolean;
        const request = context.switchToHttp().getRequest();
        await super.logIn(request);
        return activate;
    }
}

@Injectable()
export class OpenIdAuthGuard extends AuthGuard('openidconnect') {
    async canActivate(context: ExecutionContext): Promise<any> {
        const activate = (await super.canActivate(context)) as boolean;
        const request = context.switchToHttp().getRequest();
        await super.logIn(request);
        return activate;
    }
}


@Injectable()
export class AuthentificatedGuard implements CanActivate {
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const req = context.switchToHttp().getRequest();
        return req.isAuthenticated();
    }
}