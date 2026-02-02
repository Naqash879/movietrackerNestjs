import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/signUp.dto';
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signUp')
  async signUp(@Body() dto: SignUpDto) {
    const data = await this.authService.signUp(dto);
    return { data };
  }

  @Get('test')
  test() {
    return { message: 'this controller' };
  }
}
