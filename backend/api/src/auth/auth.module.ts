import { Module } from '@nestjs/common';
import { AuthService } from './services/auth/auth.service';
import { AuthController } from './controllers/auth/auth.controller';
import { IntraStrategy } from './strategies/intra';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/typeorm';
import { SessionSerializer } from './utils/serializer';
import { TwofaService } from './services/twofa/twofa.service';

@Module({
  providers: [
    IntraStrategy,
    SessionSerializer,
    {
    provide: 'AUTH_SERVICE',
    useClass: AuthService
  },
    TwofaService,],
  controllers: [AuthController],
  imports: [
    TypeOrmModule.forFeature([User])
  ]
})
export class AuthModule {}
