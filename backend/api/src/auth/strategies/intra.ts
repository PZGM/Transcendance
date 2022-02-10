import { Strategy, Profile } from 'passport-42';
import { PassportStrategy } from '@nestjs/passport';
import { Inject, Injectable } from '@nestjs/common';
import { AuthentificationProvider } from '../services/auth/auth';

@Injectable()
export class IntraStrategy extends PassportStrategy(Strategy) {
    constructor(@Inject('AUTH_SERVICE') private readonly authService: AuthentificationProvider) {
        super({
            clientID: process.env.INTRA_CLIENT_ID,
            clientSecret: process.env.INTRA_CLIENT_SECRET,
            callbackURL: process.env.INTRA_CALLBACK_URL, 
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
        img_url : photos[0].value,
        status: 0
    };

    return this.authService.validateUser(details);
    }
}