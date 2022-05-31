import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { UserDTO } from 'src/user/user.dto';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Body() body: UserDTO) {
    return this.authService.login(body);
  }
}
