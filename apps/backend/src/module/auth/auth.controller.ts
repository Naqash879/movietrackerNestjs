import { Body, Controller, Get, Post, Res, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/signUp.dto';
import { LoginDto } from './dto/login.dto';
import type { Request, Response } from 'express';
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signUp')
  async signUp(@Body() dto: SignUpDto) {
    const data = await this.authService.signUp(dto);
    return { data };
  }
  @Post('loginCheck')
  async login(
    @Body() dto: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { message, userData, accessToken, refreshToken } =
      await this.authService.loginCheck(dto);
    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      sameSite: 'lax',
      maxAge: 15 * 60 * 1000,
    });

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return { message, userData, accessToken, refreshToken };
  }
  //   @Get('test')
  //   test(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
  //     return { method: req.method, token: req.cookies.token };
  //   }
}
