import { Module } from '@nestjs/common';
import { AdminService } from './service/admin.service';
import { AdminController } from './controller/admin.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/db/entities/user.entity';
import { HotelEntity } from 'src/db/entities/hotel.entity';
import { JwtModule } from '@nestjs/jwt';
import { JwtConfigService } from 'src/utils/jwt/jwt.config';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity,HotelEntity]),JwtModule.registerAsync({useClass:JwtConfigService})],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}
