import { Inject, Injectable } from "@nestjs/common";
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from "passport-openidconnect";
import { AuthentificationProvider } from "../services/auth/auth";


@Injectable()
export class OpenIdStrategy extends PassportStrategy(Strategy) {
    constructor(@Inject('AUTH_SERVICE') private readonly authService: AuthentificationProvider) {
        super({
            issuer: 'https://fcp.integ01.dev-franceconnect.fr',
            authorizationURL: 'https://fcp.integ01.dev-franceconnect.fr/api/v1/authorize',
            tokenURL: 'https://fcp.integ01.dev-franceconnect.fr/api/v1/token',
            userInfoURL: 'https://fcp.integ01.dev-franceconnect.fr/api/v1/userinfo',
            clientID: 'f7e62337daeceb1a18ad9a694fb7d49edce8c426d7c0c24a42fd233210e929b7',
            clientSecret: 'e3e4049b282b58b92ee43eeb67f235b57b5eb5eacbd5da599145e6043349dbb5',
            callbackURL: 'http://ssh.billyboy.fr:3000/api/auth/redirect-oi'
        });
    }

    async validate(accessToken: string, refreshToken: string, profile: any) : Promise<any> {
    const { username : login , name ,id: intraId, photos } = profile;
    //let img_url: string = photos[0].value;
    const details = {
        login,
        firstName : name.givenName,
        lastName : name.familyName,
        intraId,
        img_url : photos[0].value
    };

    return this.authService.validateUser(details);
    //console.log(profile)
    }
}