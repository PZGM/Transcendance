import { Inject, Injectable } from "@nestjs/common";
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from "passport-franceconnect";
import { AuthentificationProvider } from "../services/auth/auth";


@Injectable()
export class FranceConnectStrategy extends PassportStrategy(Strategy) {
    constructor(@Inject('AUTH_SERVICE') private readonly authService: AuthentificationProvider) {
        super({
            clientID: process.env.FRANCE_CONNECT_CLIENT_ID,
            clientSecret: process.env.FRANCE_CONNECT_CLIENT_SECRET,
            callbackURL: process.env.FRANCE_CONNECT_CALLBACK_URL, 
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