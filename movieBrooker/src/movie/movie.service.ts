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

    async GetMovies(page: number = 1, search?: string, sort?: string){
            const reqUrl = this.apiUrl + `/discover/movie?api_key=${this.apiKey}&page=` + page + (sort != undefined ? "&sort_by=" + sort : "") + (search != undefined ? "&query=" + encodeURIComponent(search) : "");
            // console.log(sort);
            // console.log(reqUrl);
        // const result = this.httpService.get(
        //     this.apiUrl + `3/discover/movie?api_key=${this.apiKey}&include_adult=true&include_video=false&language=en-US&page=` + page + (sort !== null ? "&sort_by=" + sort : "")
             const result = this.httpService.get(reqUrl, {
                headers: {
                    'Accept': 'application/json'
                }
             }).pipe(
                map(response=> response.data)
             );
        //     // {
        //     //     headers: {
        //     //         Authorization: `Bearer ${this.apiJwt}`,
        //     //     },
        //     // }
        // );
        // if(search !== null){
        //     return this.filter(String(search), String(result));
        // }
        // const reqUrl = `${this.apiUrl}3/dicover/movie?api_key=${this.apiKey}&page=1`;
        // const reqUrl = "https://api.themoviedb.org/3/discover/movie?api_key=119d4562ab9d082f729fff311f3c414a&language=en-US&page=1";
        // console.log(reqUrl);
        // let result = await fetch(reqUrl);
        // console.log(result);
        return result;

    }
}
