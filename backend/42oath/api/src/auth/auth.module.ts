import { Module } from '@nestjs/common';
import { AuthService } from './services/auth/auth.service';
import { AuthController } from './controllers/auth/auth.controller';
import { FranceConnectStrategy } from './strategies/france-connect';
import { IntraStrategy } from './strategies/intra';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/typeorm';
import { SessionSerializer } from './utils/serializer';
import { OpenIdStrategy } from './strategies/openid';

@Module({
  providers: [
    IntraStrategy,
    SessionSerializer,
    {
    provide: 'AUTH_SERVICE',
    useClass: AuthService
  }],
  controllers: [AuthController],
  imports: [
    TypeOrmModule.forFeature([User])
  ]
})
export class AuthModule {}
