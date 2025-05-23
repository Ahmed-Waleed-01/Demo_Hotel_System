import { Module } from '@nestjs/common';
import { AuthController } from './controller/auth.controller';
import { AuthService } from './service/auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/db/entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { JwtConfigService, jwtOptions } from 'src/utils/jwt/jwt.config';

@Module({
    imports:[TypeOrmModule.forFeature([UserEntity]),JwtModule.registerAsync({useClass: JwtConfigService})],
    exports:[],
    controllers:[AuthController],
    providers:[AuthService]
})
export class AuthModule {}
