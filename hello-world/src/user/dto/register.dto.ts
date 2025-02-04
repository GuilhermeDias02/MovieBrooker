import { ValidationPipe } from "@nestjs/common";
import { IsEmail, IsNotEmpty } from "class-validator";

export class RegisterDto extends ValidationPipe {
    @IsNotEmpty()
    name: string;
    @IsEmail()
    @IsNotEmpty()
    email: string;
    @IsNotEmpty()
    password: string;
}