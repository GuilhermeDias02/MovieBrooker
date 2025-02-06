import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { User } from "../user/user.entity";
import { RegisterDto } from "src/user/dto/register.dto";
import { LoginDto } from "src/user/dto/login.dto";
import { JwtService } from "@nestjs/jwt";
import { UserService } from "../user/user.service";
import { log } from 'console';

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly userService: UserService,
    ) { };

    async validateUser(userEmail: string, userPassword: string): Promise<User | null> {
        const email = userEmail;
        let user = await this.userService.getOneByEmail(email);
        if (user === null || !bcrypt.compare(userPassword, user.password))
            return null;
        return user;
    }

    async register(register: RegisterDto): Promise<User> {
        return this.userService.register(register);
    }

    async login(login: LoginDto): Promise<{ access_token: string }> {
        // const user = this.userService.login(login);
        const user = await this.validateUser(login.email, login.password);
        // todo: jwt
        // const payload = { sub: user?.id, email: user?.email };
        // access_token: await this.jwtService.signAsync(payload);
        // return user
        if (!user) {
            throw new UnauthorizedException();
        }
        const payload = { username: user.name, sub: user.id };
        return { access_token: this.jwtService.sign(payload) };
    }
}
