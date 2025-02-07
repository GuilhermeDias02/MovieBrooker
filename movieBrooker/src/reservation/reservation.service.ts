import { Injectable } from '@nestjs/common';
import { Reservation } from './reservation.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ReservationDto } from './dto/reservatio.dto';

@Injectable()
export class ReservationService {
    constructor(
        @InjectRepository(Reservation)
        private reservationRepository: Repository<Reservation>,
    ) { }

    // async register(register: RegisterDto): Promise<User> {
    //     let user: User = new User();
    //     user.name = register.name;
    //     user.email = register.email;
    //     const hash = await bcrypt.hash(register.password, 10);
    //     user.password = hash;
    //     this.usersRepository.save(user);
    //     return user;
    // }

    // async login(login: LoginDto): Promise<User | null> {
    //     const user = this.authService.validateUser(login.email, login.password);
    //     // todo: jwt
    //     // const payload = { sub: user?.id, email: user?.email };
    //     // access_token: await this.jwtService.signAsync(payload);
    //     return user
    // }

    // async getOneByEmail(userEmail: string): Promise<User|null>{
    //     return await this.usersRepository.findOneBy({ email: userEmail });
    // }

    async makeReservation(reservationDto: ReservationDto): Promise<Reservation>{
        let reservation = new Reservation();
        reservation.idMovie = reservationDto.idMovie;
        reservation.idUser = reservationDto.idUser;
        reservation.movieDuration = reservationDto.movieDuration ?? '2h';;
        reservation.sessionTime = reservationDto.sessionTime;
        reservation.reservationTime = new Date();
        this.reservationRepository.save(reservation);

        return reservation;
    }
}
