"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthentificatedGuard = exports.OpenIdAuthGuard = exports.FranceConnectAuthGuard = exports.IntraAuthGuard = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
let IntraAuthGuard = class IntraAuthGuard extends (0, passport_1.AuthGuard)('42') {
    async canActivate(context) {
        const activate = (await super.canActivate(context));
        const request = context.switchToHttp().getRequest();
        await super.logIn(request);
        return activate;
    }
};
IntraAuthGuard = __decorate([
    (0, common_1.Injectable)()
], IntraAuthGuard);
exports.IntraAuthGuard = IntraAuthGuard;
let FranceConnectAuthGuard = class FranceConnectAuthGuard extends (0, passport_1.AuthGuard)('france-connect') {
    async canActivate(context) {
        const activate = (await super.canActivate(context));
        const request = context.switchToHttp().getRequest();
        await super.logIn(request);
        return activate;
    }
};
FranceConnectAuthGuard = __decorate([
    (0, common_1.Injectable)()
], FranceConnectAuthGuard);
exports.FranceConnectAuthGuard = FranceConnectAuthGuard;
let OpenIdAuthGuard = class OpenIdAuthGuard extends (0, passport_1.AuthGuard)('oidc') {
    async canActivate(context) {
        const activate = (await super.canActivate(context));
        const request = context.switchToHttp().getRequest();
        await super.logIn(request);
        return activate;
    }
};
OpenIdAuthGuard = __decorate([
    (0, common_1.Injectable)()
], OpenIdAuthGuard);
exports.OpenIdAuthGuard = OpenIdAuthGuard;
let AuthentificatedGuard = class AuthentificatedGuard {
    async canActivate(context) {
        const req = context.switchToHttp().getRequest();
        return req.isAuthenticated();
    }
};
AuthentificatedGuard = __decorate([
    (0, common_1.Injectable)()
], AuthentificatedGuard);
exports.AuthentificatedGuard = AuthentificatedGuard;
//# sourceMappingURL=index.js.map