import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { User } from "../user/user.entity";
import { RegisterDto } from "src/user/dto/register.dto";
import { LoginDto } from "src/user/dto/login.dto";
import { JwtService } from "@nestjs/jwt";
import { UserService } from "../user/user.service";

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

    async validateNewUser(password: string, email: string): Promise<boolean>{
        const user = await this.userService.getOneByEmail(email);
        if(user !== null){
            return true;
        }
        return false;
    }

    async register(register: RegisterDto): Promise<User> {
        const validNewUser = this.validateNewUser(register.password, register.email);
        if (!validNewUser) {
            throw new BadRequestException();
        }
        return this.userService.register(register);
    }

    async login(login: LoginDto): Promise<{ access_token: string }> {
        const user = await this.validateUser(login.email, login.password);
        if (!user) {
            throw new UnauthorizedException();
        }
        const payload = { sub: user.id, email: user.email };
        return { access_token: this.jwtService.sign(payload) };
    }
}
