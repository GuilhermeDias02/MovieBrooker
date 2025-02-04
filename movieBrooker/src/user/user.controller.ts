/* eslint-disable prettier/prettier */
import { Body, Controller, HttpStatus, Post, Res, UsePipes, ValidationPipe } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { UserService } from './user.service';
import { User } from './user.entity';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) { };

    @Post("register")
    async postRegister(@Body() body: RegisterDto): Promise<string> {
        // res.status(HttpStatus.CREATED).send();
        let user: User = await this.userService.register(body);
        return "register";
    }

    @Post("login")
    async postLogin(@Body() body: LoginDto): Promise<string|null> {
        return await this.userService.login(body);
    }
}
