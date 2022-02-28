"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OpenIdStrategy = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const passport_openidconnect_1 = require("passport-openidconnect");
let OpenIdStrategy = class OpenIdStrategy extends (0, passport_1.PassportStrategy)(passport_openidconnect_1.Strategy) {
    constructor(authService) {
        super({
            issuer: 'https://fcp.integ01.dev-franceconnect.fr',
            authorizationURL: 'https://fcp.integ01.dev-franceconnect.fr/api/v1/authorize',
            tokenURL: 'https://fcp.integ01.dev-franceconnect.fr/api/v1/token',
            userInfoURL: 'https://fcp.integ01.dev-franceconnect.fr/api/v1/userinfo',
            clientID: 'f7e62337daeceb1a18ad9a694fb7d49edce8c426d7c0c24a42fd233210e929b7',
            clientSecret: 'e3e4049b282b58b92ee43eeb67f235b57b5eb5eacbd5da599145e6043349dbb5',
            callbackURL: 'http://ssh.billyboy.fr:3000/api/auth/redirect-oi'
        });
        this.authService = authService;
    }
    async validate(accessToken, refreshToken, profile) {
        const { username: login, name, id: intraId, photos } = profile;
        const details = {
            login,
            firstName: name.givenName,
            lastName: name.familyName,
            intraId,
            img_url: photos[0].value
        };
        return this.authService.validateUser(details);
    }
};
OpenIdStrategy = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('AUTH_SERVICE')),
    __metadata("design:paramtypes", [Object])
], OpenIdStrategy);
exports.OpenIdStrategy = OpenIdStrategy;
//# sourceMappingURL=openid.js.map