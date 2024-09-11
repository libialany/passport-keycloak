import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PassportModule } from '@nestjs/passport';
import { HttpModule } from '@nestjs/axios';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { entities } from './typeorm';
@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot(),
    PassportModule.register({ session: true }),
    TypeOrmModule.forRoot({
      // type: 'mysql',
      // host: process.env.MYSQL_DB_HOST,
      // port: Number.parseInt(process.env.MYSQL_DB_PORT),
      // username: process.env.MYSQL_DB_USER,
      // password: process.env.MYSQL_DB_PASS,
      // database: process.env.MYSQL_DB_NAME,
      // entities,
      // synchronize: true,
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: 5432,
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWD,
      database: process.env.DATABASE_NAME,
      entities,
      synchronize: true,
    }),
    HttpModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
