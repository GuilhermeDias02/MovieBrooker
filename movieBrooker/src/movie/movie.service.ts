import { HttpService } from '@nestjs/axios';
import { Get, Injectable, UseGuards, Request, Query } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { AxiosResponse, formToJSON } from 'axios';
import { map, Observable } from 'rxjs';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Injectable()
export class MovieService {

    private readonly apiUrl = process.env.API_URL;
    private readonly apiKey = process.env.API_KEY;
    constructor(
        // private configService: ConfigService,
        private readonly httpService: HttpService,
    ) { };

    // updateToken(): void {
    //     this.httpService.get(this.API_URL + "search/movie?");
    // }

    // filter(search: string, value: string) {
    //     const toFilter = JSON.parse(value).results;
    //     let filtered = toFilter.arrayfilter();
    // }

    // sort(sort: string) {

    // }

    async GetMovies(page: number = 1, search?: string, sort?: string) {
        const reqUrl = this.apiUrl + `/discover/movie?api_key=${this.apiKey}&page=` + page + (sort != undefined ? "&sort_by=" + sort : "") + (search != undefined ? "&with_keywords=" + encodeURIComponent(search) : "");
        const result = this.httpService.get(reqUrl, {
            headers: {
                'Accept': 'application/json'
            }
        }).pipe(
            map(response => response.data)
        );
        return result;
    }

    //chantier
    GetMovie(movieId: number) {
    //     const reqUrl = this.apiUrl + `/discover/movie?api_key=${this.apiKey}&id=${movieId}`
    //     const result = this.httpService.get(reqUrl, {
    //         headers: {
    //             'Accept': 'application/json'
    //         }
    //     }).pipe(
    //         map(response => response.data)
    //     );
    //     return result;
    }
}
