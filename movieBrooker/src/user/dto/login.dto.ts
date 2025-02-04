import { ValidationPipe } from "@nestjs/common";
import { IsEmail, IsNotEmpty } from "class-validator";

export class LoginDto extends ValidationPipe {
    @IsEmail()
    @IsNotEmpty()
    email: string;
    @IsNotEmpty()
    password: string;
}