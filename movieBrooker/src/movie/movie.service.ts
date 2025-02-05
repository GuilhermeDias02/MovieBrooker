import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MovieService {
    private readonly API_URL = process.env.API_URL;
    constructor(private readonly httpService: HttpService) {};
    async GetMovies(page: number = 1, search: string = "", sort: string = ""): Promise<any> {
        if (search !== "") {
            return this.httpService.get(this.API_URL + "search/movie?");
        }
    }
}
