import { ClassSerializerInterceptor, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { neonConnectionOptions, postgresConnectionOptions } from './db/dbConfig';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { ManagerModule } from './manager/manager.module';
import { AdminModule } from './admin/admin.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { CloudinaryModule } from './utils/cloudinary/cloudinary.module';



@Module({
  imports: [AuthModule,ConfigModule.forRoot(), TypeOrmModule.forRoot(neonConnectionOptions), UserModule, ManagerModule, AdminModule, CloudinaryModule],
  controllers: [],
  providers: [CloudinaryModule],
})

export class AppModule {}
