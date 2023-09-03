import { Module } from '@nestjs/common';
import UserController from './controllers/user.controller';
import connectionModule from './connection.module';
import JWTService from './services/jwt.service';
import { EncryptionService } from './services/encryption.service';
import SessionsController from './controllers/sessions.controller';

@Module({
  imports: [connectionModule],
  controllers: [UserController, SessionsController],
  providers: [JWTService, EncryptionService],
})
export class AppModule {}
