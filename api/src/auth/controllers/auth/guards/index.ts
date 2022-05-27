import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { CustomRequest } from "src/utils/types";

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
export class AuthentificatedGuard implements CanActivate {
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const req = context.switchToHttp().getRequest();
        return req.isAuthenticated();
    }
}

@Injectable()
export class FullyAuthentificatedGuard implements CanActivate {
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const req: CustomRequest = context.switchToHttp().getRequest();
        if (req.user == undefined)
            return false;
        if (! req.user.twofa)
            return true;
        return req.session.istwofa;
    }
}