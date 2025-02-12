/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { MovieModule } from './movie/movie.module';
import { ReservationModule } from './reservation/reservation.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.useGlobalPipes(new ValidationPipe({
        transform: true,
    }));

    const config = new DocumentBuilder()
        .setTitle('Movie Brooker api')
        .setDescription('movie brooker api')
        .setVersion('1.0')
        // .addTag('movieBrooker')
        .addBearerAuth()
        .build();
    const documentFactory = () => SwaggerModule.createDocument(app, config, {
        include: [UserModule, AuthModule, MovieModule, ReservationModule]
    });
    SwaggerModule.setup('api', app, documentFactory);

    await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
