import { Module } from '@nestjs/common';
import { AuthService } from './services/auth/auth.service';
import { AuthController } from './controllers/auth/auth.controller';
import { DiscordStrategy } from './strategies';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/typeorm';
import { SessionSerializer } from './utils/serializer';

@Module({
  providers: [
    DiscordStrategy,
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
