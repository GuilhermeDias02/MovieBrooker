import { ValidationPipe } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty } from "class-validator";

export class ReservationDto extends ValidationPipe {
    @IsNotEmpty()
    @ApiProperty({example: "example@email.com"})
    idUser: number;

    @IsNotEmpty()
    @ApiProperty()
    idMovie: number;

    @IsNotEmpty()
    @ApiProperty()
    sessionTime: Date;

    @ApiProperty()
    movieDuration: string = "2h";
}