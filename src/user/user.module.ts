import { Module } from '@nestjs/common';
import { UserService } from './service/user.service';
import { UserController } from './controller/user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/db/entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { JwtConfigService } from 'src/utils/jwt/jwt.config';

@Module({
  imports:[TypeOrmModule.forFeature([UserEntity]), JwtModule.registerAsync({useClass:JwtConfigService})],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
