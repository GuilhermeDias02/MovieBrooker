import { ValidationPipe } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty } from "class-validator";

export class LoginDto extends ValidationPipe {
    @IsEmail()
    @IsNotEmpty()
    @ApiProperty({example: "example@email.com"})
    email: string;

    // todo: regex pw verification
    @IsNotEmpty()
    @ApiProperty()
    password: string;
}