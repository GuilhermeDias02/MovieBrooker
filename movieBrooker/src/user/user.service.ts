import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';

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

    async login(login: LoginDto): Promise<string|null> {
        const email = login.email;
        let user = await this.usersRepository.findOneBy({email});
        if(user === null || !bcrypt.compare(login.password, user.password))
            return null;
        return "jwt";
    }
}
