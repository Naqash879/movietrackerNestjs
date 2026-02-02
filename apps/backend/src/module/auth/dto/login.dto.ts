import { IsEmail, IsNotEmpty } from 'class-validator';

export class LoginDto {
  @IsNotEmpty({ message: 'Email Required' })
  @IsEmail({}, { message: 'Follow Email pattern' })
  email!: string;
  @IsNotEmpty({ message: 'Password is required' })
  password!: string;
}
