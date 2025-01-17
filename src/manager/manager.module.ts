import { Module } from '@nestjs/common';
import { ManagerService } from './service/manager.service';
import { ManagerController } from './controller/manager.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/db/entities/user.entity';
import { HotelEntity } from 'src/db/entities/hotel.entity';
import { AuthModule } from 'src/auth/auth.module';
import { AuthService } from 'src/auth/service/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtConfigService } from 'src/utils/jwt/jwt.config';
import { PhoneNumberEntity } from 'src/db/entities/phoneNumber.entity';
import { AttachmentEntity } from 'src/db/entities/attachment.entity';
import { AmenitiesEntity } from 'src/db/entities/amenities.entity';
import { CloudinaryModule } from 'src/utils/cloudinary/cloudinary.module';

@Module({
  imports:[TypeOrmModule.forFeature([UserEntity,HotelEntity,PhoneNumberEntity,AttachmentEntity,AmenitiesEntity]),AuthModule, JwtModule.registerAsync({useClass: JwtConfigService}), CloudinaryModule],
  controllers: [ManagerController],
  providers: [ManagerService,AuthService],
})
export class ManagerModule {}
