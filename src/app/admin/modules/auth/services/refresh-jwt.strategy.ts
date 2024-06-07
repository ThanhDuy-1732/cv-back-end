// Utilities
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';

// Services
import { ConfigService } from '@nestjs/config';
import { CacheService } from 'src/app/admin/services/cache.service';
import { UserService } from 'src/app/admin/modules/user/services/user.service';

// Entities
import {
  Session,
  SessionType,
  SessionState,
} from 'src/app/admin/entities/session.entity';
import { User, UserState } from 'src/app/admin/entities/user.entity';

@Injectable()
export class RefreshJwtStrategy extends PassportStrategy(
  Strategy,
  'refresh-jwt',
) {
  constructor(
    private userService: UserService,
    private cacheService: CacheService,
    private configService: ConfigService,
    @InjectRepository(Session)
    private sessionRepository: Repository<Session>,
  ) {
    super({
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_SECRET'),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload: any) {
    const id = +payload.id;
    const sessionId = +payload.sessionId;

    const session = await this.cacheService.get<Session>(
      `user_refresh_session_${sessionId}`,
      () =>
        this.sessionRepository.findOneBy({
          id: sessionId,
          type: SessionType.RefreshToken,
        }),
    );

    if (!session) {
      throw new UnauthorizedException('Unauthorized');
    }

    if (session.state !== SessionState.Active) {
      throw new UnauthorizedException('Unauthorized');
    }

    if (session.userId !== id) {
      throw new UnauthorizedException('Unauthorized');
    }

    const user = await this.cacheService.get<User>(`user_${id}`, async () => {
      try {
        return await this.userService.findUserById(id);
      } catch (error) {
        throw new UnauthorizedException('Unauthorized');
      }
    });

    if (user?.state === UserState.InActive) {
      throw new UnauthorizedException('User account not active');
    }

    return user;
  }
}
