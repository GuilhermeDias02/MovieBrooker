import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ) { }

    async register(register: RegisterDto): Promise<User> {
        let user: User = new User();
        user.name = register.name;
        user.email = register.email;
        const hash = await bcrypt.hash(register.password, 10);
        user.password = hash;
        this.usersRepository.save(user);
        return user;
    }

    // async login(login: LoginDto): Promise<User | null> {
    //     const user = this.authService.validateUser(login.email, login.password);
    //     // todo: jwt
    //     // const payload = { sub: user?.id, email: user?.email };
    //     // access_token: await this.jwtService.signAsync(payload);
    //     return user
    // }

    async getOneByEmail(userEmail: string): Promise<User|null>{
        return await this.usersRepository.findOneBy({ email: userEmail });
    }
}
