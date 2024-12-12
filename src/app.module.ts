import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { postgresConnectionOptions } from './db/dbConfig';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';



@Module({
  imports: [AuthModule,ConfigModule.forRoot(), TypeOrmModule.forRoot(postgresConnectionOptions), UserModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
