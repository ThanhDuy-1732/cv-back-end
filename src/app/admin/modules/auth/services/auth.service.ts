// Utilities
import { DataSource, Equal, IsNull, Not, Or, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, UnauthorizedException } from '@nestjs/common';

// DTOs
import { AuthGetTokenDTO, AuthSignInDTO } from '../dto/auth.dto';

// Entities
import {
  Session,
  SessionType,
  SessionState,
} from 'src/app/admin/entities/session.entity';
import { User, UserState } from 'src/app/admin/entities/user.entity';

// Services
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { CacheService } from 'src/app/admin/services/cache.service';
import { CryptoService } from 'src/app/admin/services/crypto.service';
import { BcryptService } from 'src/app/admin/services/bcrypt.service';
import { SessionQueueProducer } from 'src/app/admin/queues/sessionQueue.producer';

// Types
export type SignInData = {
  token: string;
  refreshToken: string;
};

@Injectable()
export class AuthService {
  constructor(
    private dataSource: DataSource,
    private jwtService: JwtService,
    private cacheService: CacheService,
    private configService: ConfigService,
    private bcryptService: BcryptService,
    private cryptoService: CryptoService,
    private sessionQueueProducer: SessionQueueProducer,
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Session) private sessionRepository: Repository<Session>,
  ) {}

  async validateAccount(username: string, password: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: {
        username,
      },
      select: {
        id: true,
        state: true,
        username: true,
        password: true,
      },
    });

    if (!user) {
      throw new UnauthorizedException('Username or password incorrect');
    }

    if (user.state === UserState.InActive) {
      throw new UnauthorizedException('Username or password incorrect');
    }

    const decryptPassword = this.cryptoService.decrypt(password, username);

    const isMatched = await this.bcryptService.compare(
      decryptPassword,
      user.password,
    );

    if (!isMatched) {
      throw new UnauthorizedException('Username or password incorrect');
    }

    return user;
  }

  async signIn(payload: AuthSignInDTO): Promise<SignInData> {
    const user = await this.validateAccount(payload.username, payload.password);

    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const tokenSession = new Session();
      tokenSession.userId = user.id;
      tokenSession.type = SessionType.Token;
      tokenSession.state = SessionState.Active;

      if (payload.userAgent) {
        tokenSession.userAgent = payload.userAgent;
      }

      const addedTokenSession = await queryRunner.manager.save(tokenSession);
      await this.sessionQueueProducer.producerSessionAddedEvent(
        addedTokenSession,
      );

      const sessions = await this.sessionRepository.find({
        where: {
          type: SessionType.Token,
          state: SessionState.Active,
          userId: addedTokenSession.userId,
          createdDate: Not(addedTokenSession.createdDate),
          userAgent: Or(Equal(addedTokenSession.userAgent), IsNull()),
        },
      });

      for (const preSession of sessions) {
        preSession.state = SessionState.InActive;
        const updatedPreSession = await queryRunner.manager.save(preSession);
        await this.sessionQueueProducer.producerSessionUpdatedEvent(
          updatedPreSession,
        );
      }

      const refreshTokenSession = new Session();
      refreshTokenSession.userId = user.id;
      refreshTokenSession.state = SessionState.Active;
      refreshTokenSession.type = SessionType.RefreshToken;

      if (payload.userAgent) {
        refreshTokenSession.userAgent = payload.userAgent;
      }

      const addedRefreshToken =
        await queryRunner.manager.save(refreshTokenSession);

      await this.sessionQueueProducer.producerSessionAddedEvent(
        addedRefreshToken,
      );

      const refreshTokens = await this.sessionRepository.find({
        where: {
          state: SessionState.Active,
          type: SessionType.RefreshToken,
          userId: addedRefreshToken.userId,
          createdDate: Not(addedRefreshToken.createdDate),
          userAgent: Or(Equal(addedRefreshToken.userAgent), IsNull()),
        },
      });

      for (const preRefreshToken of refreshTokens) {
        preRefreshToken.state = SessionState.InActive;
        const updatedPreRefreshToken =
          await queryRunner.manager.save(preRefreshToken);
        await this.sessionQueueProducer.producerSessionUpdatedEvent(
          updatedPreRefreshToken,
        );
      }

      await this.cacheService.set(
        `user_session_${addedTokenSession.id}`,
        addedTokenSession,
        this.configService.get('REDIS_TTL'),
      );

      await this.cacheService.set(
        `user_refresh_session_${addedRefreshToken.id}`,
        addedRefreshToken,
        this.configService.get('REDIS_TTL'),
      );

      const token = this.jwtService.sign({
        id: user.id,
        type: SessionType.Token,
        username: user.username,
        sessionId: tokenSession.id,
      });

      const refreshToken = this.jwtService.sign({
        id: user.id,
        username: user.username,
        type: SessionType.RefreshToken,
        sessionId: refreshTokenSession.id,
      });

      await queryRunner.commitTransaction();

      return {
        token,
        refreshToken,
      };
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async getToken(payload: AuthGetTokenDTO): Promise<string> {
    const session = new Session();
    session.userId = payload.userId;
    session.type = SessionType.Token;
    session.state = SessionState.Active;

    if (payload.userAgent) {
      session.userAgent = payload.userAgent;
    }

    const addedTokenSession = await this.sessionRepository.save(session);

    await this.cacheService.set(
      `user_session_${addedTokenSession.id}`,
      addedTokenSession,
      this.configService.get('REDIS_TTL'),
    );

    return this.jwtService.sign({
      id: payload.userId,
      sessionId: session.id,
      type: SessionType.Token,
      username: payload.username,
    });
  }

  async signOut(): Promise<any> {
    return 'Sign out';
  }

  async forgotPassword(): Promise<any> {
    return 'Forgot password';
  }

  async updatePassword(): Promise<any> {
    return 'Update password';
  }
}
