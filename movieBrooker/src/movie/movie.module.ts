import { Module } from '@nestjs/common';
import { MovieService } from './movie.service';
import { MovieController } from './movie.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  providers: [MovieService],
  controllers: [MovieController],
  imports: [HttpModule],
})
export class MovieModule {}
