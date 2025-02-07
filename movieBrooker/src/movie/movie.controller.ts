import { Controller, Get, Query, UseGuards, Request } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { MovieService } from './movie.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

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
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Get("/movies")
    GetMovies(@Request() req, @Query('page') page: number = 1, @Query('search') search?: string, @Query('sort') sort?: string): any {
        const movies = this.movieService.GetMovies(page, search, sort);
        return movies;
    }
}
