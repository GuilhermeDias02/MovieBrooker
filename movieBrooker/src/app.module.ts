/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { ConfigModule } from '@nestjs/config';
import { User } from './user/user.entity';
// import { HttpModule } from '@nestjs/axios';
import { MovieModule } from './movie/movie.module';
import { AuthModule } from './auth/auth.module';
import { ReservationModule } from './reservation/reservation.module';
import { Reservation } from './reservation/reservation.entity';

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: '.env',
        }),
        TypeOrmModule.forRoot({
            type: 'mysql',
            host: process.env.DATABASE_HOST,
            port: Number(process.env.DATABASE_PORT),
            username: process.env.DATABASE_USER,
            password: process.env.DATABASE_PASSWORD,
            database: process.env.DATABASE_NAME,
            entities: [User, Reservation],
            synchronize: true,
        }),
        UserModule,
        MovieModule,
        AuthModule,
        ReservationModule,
    ],
    controllers: [AppController],
    providers: [AppService],

})
export class AppModule {
    constructor(private dataSource: DataSource) { }
}
