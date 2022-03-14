import { Body, ClassSerializerInterceptor, Controller, Get, HttpCode, Post, Req, Res, Session, UnauthorizedException, UseGuards, UseInterceptors } from '@nestjs/common';
import { TwofaService } from 'src/auth/services/twofa/twofa.service';
import { CustomRequest } from 'src/utils/types';
import { AuthentificatedGuard, FullyAuthentificatedGuard } from 'src/auth/controllers/auth/guards';
import { Response } from 'express';
import { IntraAuthGuard } from '../auth/guards';
import { TwofaCodeDto } from 'src/dto/twofaCode.dto';
import { Request } from 'express';
import { UsersService } from './../../../users/users.service'
import { ApiTags } from '@nestjs/swagger';



@ApiTags('Two Factors Authentification')
@Controller('2fa')
@UseInterceptors(ClassSerializerInterceptor)
export class TwofaController {
  constructor(
    private readonly twofaService: TwofaService,
    private readonly userService: UsersService
  ) {}
 
    @Get('generate')
    @UseGuards(AuthentificatedGuard)
    async register(@Res() response: Response, @Req() request: CustomRequest) {
    const { otpauthUrl } = await this.twofaService.generateTwofaSecret(request.user);
        return this.twofaService.pipeQrCodeStream(response, otpauthUrl);
    }

    @Post('authenticate')
    @HttpCode(200)
    @UseGuards(AuthentificatedGuard)
    async authenticate(
        @Session() session: Record<string, any>,
        @Req() request: CustomRequest,
        @Body() { twofaCode } : TwofaCodeDto
    ) {
      if (!request.user || !request.user.twofaSecret)
        throw new UnauthorizedException('Generate code before');
      const isCodeValid = this.twofaService.isTwofaCodeValid(
        twofaCode, request.user
      );
      if (!isCodeValid) {
        throw new UnauthorizedException('Wrong authentication code');
      }

      session.istwofa = true;
      return request.user;
    }

    @Post('turnon')
    @HttpCode(200)
    @UseGuards(AuthentificatedGuard)
    async turnOnTwofa(
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
      await this.userService.turnOnTwofa(request.user.id);
    }

    @Post('turnoff')
    @HttpCode(200)
    @UseGuards(FullyAuthentificatedGuard)
    async turnOffTwofa(
      @Req() request: CustomRequest,
    ) {
      await this.userService.turnOffTwofa(request.user.id);
    }

    @Get('enabled')
    @UseGuards(AuthentificatedGuard)
    async enabled(@Req() request: CustomRequest) {
        return await this.userService.isTwofaEnabled(request.user.id);
    }

    @Get('fully-authentificated')
    @UseGuards(FullyAuthentificatedGuard)
    isFullyAuthentificated(@Req() request: CustomRequest) {
        return true;
    }

}