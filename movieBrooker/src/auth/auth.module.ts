import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { JwtAuthGuard } from './jwt-auth.guard';
import { UserModule } from 'src/user/user.module';
import { AuthService } from './auth.service';
import { UserService } from 'src/user/user.service';
import { ConfigModule } from '@nestjs/config';

@Module({
    imports: [
        UserModule,
        PassportModule,
        ConfigModule.forRoot({
            envFilePath: '.env',
        }),
        JwtModule.register({
            secret: process.env.JWT_SECRET,
            signOptions: { expiresIn: '7d' },
        }),
    ],
    controllers: [AuthController],
    providers: [AuthService, LocalStrategy, JwtAuthGuard],
    exports: [AuthService],
})
export class AuthModule { }
