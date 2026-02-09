import { Body, Controller, Post, Res, Get } from '@nestjs/common';
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
    const response = await this.authService.loginCheck(dto);
    const { message, userData, accessToken, refreshToken } = response;
    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      maxAge: 15 * 60 * 1000,
      sameSite: 'lax',
      secure: false,
    });

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
      sameSite: 'lax',
      secure: false,
    });

    // return { message, userData, accessToken, refreshToken };
    return { message, userData };
  }
  @Get('logout')
  logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('accessToken', {
      httpOnly: true,
      sameSite: 'lax',
      secure: false,
    });
    res.clearCookie('refreshToken', {
      httpOnly: true,
      sameSite: 'lax',
      secure: false,
    });
    res.clearCookie('last_admin_route', {
      httpOnly: true,
      sameSite: 'lax',
      secure: false,
    });
    return { message: 'Successfully logout' };
  }
  // @Get('testtoken')
  // test(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
  //   return { method: req.method, token: req.cookies.accessToken };
  // }
}
