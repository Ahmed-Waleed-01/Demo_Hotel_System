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

@Module({
  imports:[TypeOrmModule.forFeature([UserEntity,HotelEntity]),AuthModule, JwtModule.registerAsync({useClass: JwtConfigService})],
  controllers: [ManagerController],
  providers: [ManagerService,AuthService],
})
export class ManagerModule {}
