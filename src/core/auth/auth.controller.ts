import { Body, Controller, Post } from '@nestjs/common';

import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { SignInDto } from './dto/sign-in.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  async login(@Body() loginPayload: LoginDto) {
    return this.authService.login(loginPayload);
  }

  @Post('/sign-up')
  async signIn(@Body() signInPayload: SignInDto): Promise<boolean> {
    return this.authService.signIn(signInPayload);
  }
}
