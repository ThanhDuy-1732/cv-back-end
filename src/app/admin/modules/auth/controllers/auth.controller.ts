// Utilities
import {
  Get,
  Res,
  Req,
  Body,
  Post,
  UseGuards,
  Controller,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { ZodValidationPipe } from 'nestjs-zod';

// Services
import { JwtAuthGuard } from 'src/app/admin/guard/jwt.guard';
import { AuthService, SignInData } from '../services/auth.service';
import { RefreshJwtAuthGuard } from 'src/app/admin/guard/refresh-jwt.guard';

// Decorators
import { GetUser } from 'src/app/admin/decorators/user.decorator';

// DTOs
import { AuthSignInDTO, authSignInSchema } from '../dto/auth.dto';

// Entities
import { User } from 'src/app/admin/entities/user.entity';

@Controller('/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/sign-in')
  async signIn(
    @Res() res: Response,
    @Body(new ZodValidationPipe(authSignInSchema)) payload: AuthSignInDTO,
  ) {
    const { token, refreshToken }: SignInData =
      await this.authService.signIn(payload);

    res.status(HttpStatus.OK).json({
      token,
      refreshToken,
    });
  }

  @Get('/me')
  @UseGuards(JwtAuthGuard)
  async getUserAccount(@Res() res: Response, @GetUser() user: User) {
    res.status(HttpStatus.OK).json({
      user: user,
    });
  }

  @Get('/token')
  @UseGuards(RefreshJwtAuthGuard)
  async getUserToken(
    @Res() res: Response,
    @GetUser() user: User,
    @Req() request: Request,
  ) {
    const token = await this.authService.getToken({
      userId: user.id,
      username: user.username,
      userAgent: request.headers['user-agent'],
    });

    res.status(HttpStatus.OK).json({
      token,
    });
  }

  @Get('/sign-out')
  @UseGuards(JwtAuthGuard)
  async logout(
    @Req() request: Request,
    @GetUser() user: User,
    @Res() res: Response,
  ) {
    await this.authService.signOut({
      userId: user.id,
      userAgent: request.headers['user-agent'],
    });

    res.status(HttpStatus.OK).json({});
  }
}
