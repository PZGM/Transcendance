import { Injectable } from '@nestjs/common';
import { authenticator } from 'otplib';
import { User } from 'src/typeorm/entities/user';
import { UsersService } from 'src/users/users.service';
import { toFileStream } from 'qrcode';
import { Response } from 'express';



@Injectable()
export class TwofaService {
    constructor (
        private readonly usersService: UsersService,
      ) {}
     
      public async generateTwofaSecret(user: User) {
        const secret = authenticator.generateSecret();
     
        const otpauthUrl = authenticator.keyuri(user.id.toString(), 'Transcendance', secret);
     
        await this.usersService.updateSecret(user.id, secret);
     
        return {
          secret,
          otpauthUrl
        }
      }

      public async pipeQrCodeStream(stream: Response, otpauthUrl: string) {
        return toFileStream(stream, otpauthUrl);
      }

      public isTwofaCodeValid(twofaCode: string, user: User) {
        return authenticator.verify({
          token: twofaCode,
          secret: user.twofaSecret
        })
      }
      
}