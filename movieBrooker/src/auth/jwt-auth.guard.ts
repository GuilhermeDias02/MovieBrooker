import { Injectable } from '@nestjs/common';
import { AuthGuard, PassportModule } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') { }