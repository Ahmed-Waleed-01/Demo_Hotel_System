import { Module } from '@nestjs/common';
import { UserService } from './service/user.service';
import { UserController } from './controller/user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/db/entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { JwtConfigService } from 'src/utils/jwt/jwt.config';
import { HotelEntity } from 'src/db/entities/hotel.entity';
import { PhoneNumberEntity } from 'src/db/entities/phoneNumber.entity';
import { AttachmentEntity } from 'src/db/entities/attachment.entity';

@Module({
  imports:[TypeOrmModule.forFeature([UserEntity,HotelEntity,PhoneNumberEntity,AttachmentEntity]), JwtModule.registerAsync({useClass:JwtConfigService})],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
