import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Reservation {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    idUser: number;

    @Column()
    idMovie: number;

    @Column()
    reservationTime: Date;

    @Column()
    sessionTime: Date;

    @Column()
    movieDuration: string = "2h";
}