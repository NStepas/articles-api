import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

export class SignInDto {
  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6, { message: 'Min length is 6' })
  password: string;

  @IsString()
  @MinLength(1, { message: 'Min length is 6' })
  @MaxLength(20, { message: 'Max length is 20' })
  first_name: string;

  @IsString()
  @MinLength(1, { message: 'Min length is 6' })
  @MaxLength(20, { message: 'Max length is 20' })
  last_name: string;
}
