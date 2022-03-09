import { Body, ClassSerializerInterceptor, Controller, Get, HttpCode, Post, Req, Res, Session, UnauthorizedException, UseGuards, UseInterceptors } from '@nestjs/common';
import { TwofaService } from 'src/auth/services/twofa/twofa.service';
import { CustomRequest } from 'src/utils/types';
import { AuthentificatedGuard } from 'src/auth/controllers/auth/guards';
import { Response } from 'express';
import { IntraAuthGuard } from '../auth/guards';
import { TwofaCodeDto } from 'src/dto/twofaCode.dto';
import { Request } from 'express';



@Controller('2fa')
@UseInterceptors(ClassSerializerInterceptor)
export class TwofaController {
  constructor(
    private readonly twofaService: TwofaService,
  ) {}
 
    @Get('generate')
    @UseGuards(AuthentificatedGuard)
    async register(@Res() response: Response, @Req() request: CustomRequest) {
    const { otpauthUrl } = await this.twofaService.generateTwofaSecret(request.user);
        return this.twofaService.pipeQrCodeStream(response, otpauthUrl);
    }

    @Get('authenticate')
    @HttpCode(200)
    @UseGuards(IntraAuthGuard)
    async authenticate(
        @Session() session: Record<string, any>,
      @Req() request: CustomRequest,
      @Body() { twofaCode } : TwofaCodeDto
    ) {
      const isCodeValid = this.twofaService.isTwofaCodeValid(
        twofaCode, request.user
      );
      if (!isCodeValid) {
        throw new UnauthorizedException('Wrong authentication code');
      }

      session.istwofa = true;
      return request.user;
    }

}