import { Module } from '@nestjs/common';
import { AuthService } from './services/auth/auth.service';
import { AuthController } from './controllers/auth/auth.controller';
import { IntraStrategy } from './strategies/intra';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Stats, User } from 'src/typeorm';
import { SessionSerializer } from './utils/serializer';
import { TwofaService } from './services/twofa/twofa.service';
import { UsersModule } from 'src/users/users.module';
import { TwofaController } from './controllers/twofa/twofa.controller';

@Module({
  providers: [
    IntraStrategy,
    SessionSerializer,
    {
    provide: 'AUTH_SERVICE',
    useClass: AuthService
  },
    TwofaService,],
  controllers: [AuthController, TwofaController],
  imports: [
    TypeOrmModule.forFeature([User,Stats]),
    UsersModule
  ]

})
export class AuthModule {}
