
import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from 'src/user/user.entity';
import { LoginDto } from 'src/user/dto/login.dto';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private authService: AuthService) { super(); }

    async validate(login: LoginDto): Promise<User> {
        const user = await this.authService.validateUser(login.email, login.password);
        if (!user) {
            throw new UnauthorizedException();
        }
        return user;
    }
}
