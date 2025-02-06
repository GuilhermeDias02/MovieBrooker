import { Body, Controller, Post, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { RegisterDto } from 'src/user/dto/register.dto';
import { User } from 'src/user/user.entity';
import { LoginDto } from 'src/user/dto/login.dto';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { };

    @ApiOperation({
        summary: 'Register a new user',
        description: 'Used to sign up a new user'
    })
    @Post("register")
    async postRegister(@Body() body: RegisterDto): Promise<User> {
        return await this.authService.register(body);
    }

    @ApiOperation({
        summary: 'Login',
        description: 'Authenticate a user and return its jwt token'
    })
    // @UseGuards(AuthGuard('local'))
    @Post("login")
    async postLogin(/*@Request() req, */@Body() login: LoginDto): Promise<{ access_token }> {

        // return await this.authService.login(body);
        // todo: return jwt
        return this.authService.login(login);
    }
}
