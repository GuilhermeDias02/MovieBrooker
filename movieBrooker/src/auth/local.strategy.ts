
import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from 'src/user/user.entity';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private authService: AuthService) {
        super();
    }

    async validate(userEmail: string, userPassword: string): Promise<User> {
        const user = await this.authService.validateUser(userEmail, userPassword);
        if (!user) {
            throw new UnauthorizedException();
        }
        return user;
    }
}
