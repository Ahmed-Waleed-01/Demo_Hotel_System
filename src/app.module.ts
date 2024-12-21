import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { postgresConnectionOptions } from './db/dbConfig';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { ManagerModule } from './manager/manager.module';
import { AdminModule } from './admin/admin.module';
import { APP_INTERCEPTOR } from '@nestjs/core';



@Module({
  imports: [AuthModule,ConfigModule.forRoot(), TypeOrmModule.forRoot(postgresConnectionOptions), UserModule, ManagerModule, AdminModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
