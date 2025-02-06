import { Injectable } from "@nestjs/common";
import { UserService } from "src/user/user.service";
import * as bcrypt from 'bcrypt';
import { User } from "src/user/user.entity";

@Injectable()
export class AuthService {
    constructor(private readonly userService: UserService) { };

    async validateUser(userEmail: string, userPassword: string): Promise<User | null> {
        const email = userEmail;
        let user = await this.userService.getOneByEmail(email);
        if (user === null || !bcrypt.compare(userPassword, user.password))
            return null;
        return user;
    }
}