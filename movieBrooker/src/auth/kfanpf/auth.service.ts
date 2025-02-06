import { Injectable } from "@nestjs/common";
import * as bcrypt from 'bcrypt';
import { User } from "src/user/user.entity";
import { RegisterDto } from "src/user/dto/register.dto";
import { LoginDto } from "src/user/dto/login.dto";
import { JwtService } from "@nestjs/jwt";
import { UserService } from "src/user/user.service";

@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService,
        private userService: UserService,
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

    async login(login: User): Promise<{ access_token: string }> {
        // const user = this.userService.login(login);
        // todo: jwt
        // const payload = { sub: user?.id, email: user?.email };
        // access_token: await this.jwtService.signAsync(payload);
        // return user
        const payload = { username: login.name, sub: login.id };
        return { access_token: this.jwtService.sign(payload) };
    }
}