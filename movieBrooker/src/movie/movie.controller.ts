import { Controller, Get, Query, UseGuards, Request, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { MovieService } from './movie.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Observable } from 'rxjs';
import { AxiosResponse } from 'axios';

@Controller('movie')
@ApiTags('movie')
export class MovieController {
    constructor(private readonly movieService: MovieService) { };
    // @ApiOperation({
    //     summary: 'Get all movies',
    //     description: '!used for testing!'
    // })
    // @Get()
    // GetAll(): Promise<Movie[]> {
    //     const movies = this.movieService.GetAll();
    //     return movies;
    // }

    @ApiOperation({
        summary: 'Get movies',
        description: 'get movies based on the specified parameters'
    })
    @Get("movies")
    async GetMovies(/*@Request() req, */@Query('page') page: number = 1, @Query('search') search?: string, @Query('sort') sort?: string) {
        const movies = await this.movieService.GetMovies(page, search, sort);
        // return movies;
        // const res = await fetch('https://api.themoviedb.org/3/discover/movie?api_key=119d4562ab9d082f729fff311f3c414a&language=en-US&page=1');
        // console.log(res);
        return movies;
    }

    // @ApiOperation({
    //     summary: 'Get movies',
    //     description: 'get movies based on the specified parameters'
    // })
    // @Post("movies")
    // Postmovies(@Request() req, @Query('page') page: number = 1, @Query('search') search?: string, @Query('sort') sort?: string){
    //     const movies = this.movieService.GetMovies(page, search, sort);
    //     return movies;
    // }
}
