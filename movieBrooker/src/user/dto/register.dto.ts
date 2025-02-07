import { ValidationPipe } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, Matches } from "class-validator";

export class RegisterDto extends ValidationPipe {
    @IsNotEmpty()
    @ApiProperty()
    name: string;

    @IsEmail()
    @IsNotEmpty()
    @ApiProperty({example: "example@email.com"})
    email: string;

    @IsNotEmpty()
    @ApiProperty({example: "Abc3?65D"})
    // @Matches('^.*(?=.{8,})(?=.*[a-zA-Z])(?=.*\d)(?=.*[!#$%&? "]).*$')
    password: string;
}