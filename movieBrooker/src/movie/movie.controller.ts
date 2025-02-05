import { Controller, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { MovieService } from './movie.service';

@Controller('movie')
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
    @Get("/movies")
    async GetMovies(@Query() page: number = 1, @Query() search: string = "", @Query() sort: string = ""): Promise<JSON> {
        const movies = await this.movieService.GetMovies(page, search, sort);
        return movies;
    }
}
