import { Injectable } from '@nestjs/common';
import { authenticator } from 'otplib';
import { User } from 'src/typeorm/entities/user';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class TwofaService {
    constructor (
        private readonly usersService: UsersService,
      ) {}
     
      public async generateTwoFactorAuthenticationSecret(user: User) {
        const secret = authenticator.generateSecret();
     
        const otpauthUrl = authenticator.keyuri(user.intraId, 'Transcendance', secret);
     
        await this.usersService.setTwoFactorAuthenticationSecret(secret, user.id);
     
        return {
          secret,
          otpauthUrl
        }
      }
}
