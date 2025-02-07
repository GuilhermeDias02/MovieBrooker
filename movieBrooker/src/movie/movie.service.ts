import { HttpService } from '@nestjs/axios';
import { Get, Injectable, UseGuards, Request, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Injectable()
export class MovieService {
    constructor(
        private readonly httpService: HttpService,
        private readonly apiUrl = String(process.env.API_URL),
        private readonly apiJwt = String(process.env.API_KEY),
    ) { };

    // updateToken(): void {
    //     this.httpService.get(this.API_URL + "search/movie?");
    // }

    filter(search: string, value: string) {
        const toFilter = JSON.parse(value).results;
        let filtered = toFilter.arrayfilter();
    }

    sort(sort: string) {

    }

    GetMovies(page: number = 1, search?: string, sort?: string): any {
        const result = this.httpService.get(
            this.apiUrl + "3/discover/movie?include_adult=true&include_video=false&language=en-US&page=" + page + (sort !== null ? "&sort_by=" + sort : ""),
            {
                headers: {
                    Authorization: `Bearer ${this.apiJwt}`,
                },
            });
        if(search !== null){
            return this.filter(String(search), String(result));
        }
        return result;
    }
}
