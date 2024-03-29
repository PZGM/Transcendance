import { Strategy } from 'passport-42';
import { PassportStrategy } from '@nestjs/passport';
import { Inject, Injectable } from '@nestjs/common';
import { AuthentificationProvider } from '../services/auth/auth';

@Injectable()
export class IntraStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject('AUTH_SERVICE')
    private readonly authService: AuthentificationProvider,
  ) {
    super({
      clientID: process.env.INTRA_CLIENT_ID,
      clientSecret: process.env.INTRA_CLIENT_SECRET,
      callbackURL: process.env.INTRA_CALLBACK_URL,
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
  ): Promise<any> {
    const { username: login, name, id: intraId, _json } = profile;
    const details = {
      login,
      firstName: name.givenName,
      lastName: name.familyName,
      intraId,
      avatar: _json.image.link,
      status: 0,
      friends: [],
      color: 'white',
    };

    return this.authService.validateUser(details);
  }
}
