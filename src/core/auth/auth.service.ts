import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { UserService } from './../../modules/user/user.service';
import { LoginDto } from './dto/login.dto';
import { SignInDto } from './dto/sign-in.dto';

@Injectable()
export class AuthService {
  protected readonly logger: Logger = new Logger(AuthService.name);
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService
  ) {}

  async login(payload: LoginDto) {
    const user = await this.userService.getUser(payload.email);
    if (!user) {
      throw new HttpException('User do not exist!', HttpStatus.UNAUTHORIZED);
    }
    this.logger.log('Validating password');
    const isPasswordValid = await this.comparePassword(
      payload.password,
      user.password
    );
    if (!isPasswordValid) {
      throw new HttpException('Wrong Password!', HttpStatus.UNAUTHORIZED);
    }
    this.logger.log('Generating tokens...');
    const token = this.generateAccessToken(payload.email);
    return {
      id: user._id,
      email: payload.email,
      ...token,
    };
  }

  async signIn(payload: SignInDto): Promise<boolean> {
    this.logger.log('creating user...');
    const generatedPassword = await this.hashPassword(payload.password);
    if (!generatedPassword) {
      throw new HttpException(
        'Failed to generate password',
        HttpStatus.BAD_REQUEST
      );
    }
    await this.userService.createUser(payload, generatedPassword);
    return true;
  }

  protected async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 12);
  }

  protected comparePassword(
    password: string,
    existedPassword: string
  ): Promise<boolean> {
    return bcrypt.compare(password, existedPassword);
  }

  protected generateAccessToken(email: string) {
    return {
      accessToken: this.getAccessToken(email),
    };
  }

  protected getAccessToken(email: string) {
    return this.jwtService.sign({ email }, { expiresIn: '8h' });
  }
}
