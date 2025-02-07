import { Module } from '@nestjs/common';
import { MovieService } from './movie.service';
import { MovieController } from './movie.controller';
import { HttpModule } from '@nestjs/axios';
import { UserModule } from 'src/user/user.module';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Module({
    imports: [
        HttpModule,
        UserModule,
        PassportModule,
        // ConfigModule.forRoot({
        //     isGlobal: true,
        //     envFilePath: '.env',
        // }),
        // JwtModule.register({
        //     secret: process.env.JWT_SECRET,
        //     signOptions: { expiresIn: process.env.JWT_EXPIRESIN },
        // }),
    ],
    providers: [MovieService],
    controllers: [MovieController],
})
export class MovieModule { }
