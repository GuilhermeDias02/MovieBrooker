/* eslint-disable prettier/prettier */
import { Body, Controller, HttpStatus, Post, Res, UsePipes, ValidationPipe } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { UserService } from './user.service';
import { User } from './user.entity';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('user')
@ApiTags('users', 'auth')
export class UserController {
    constructor(private readonly userService: UserService) { };

    @ApiOperation({
        summary: 'Register a new user',
        description: 'Used to sign up a new user'
    })
    @Post("register")
    async postRegister(@Body() body: RegisterDto): Promise<User> {
        return await this.userService.register(body);
    }

    @ApiOperation({
        summary: 'Login',
        description: 'Authenticate a user and return its jwt token'
    })
    @Post("login")
    async postLogin(@Body() body: LoginDto): Promise<User | null> {

        return await this.userService.login(body);
        // todo: return jwt
    }
}
