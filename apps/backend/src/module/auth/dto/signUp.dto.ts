import { IsNotEmpty, IsEmail, MinLength } from 'class-validator';

export class SignUpDto {
  @IsNotEmpty({ message: 'Name is required' })
  name!: string;

  @IsEmail({}, { message: 'invalid email' })
  email!: string;

  @MinLength(6, { message: 'password must be at least 6 characters' })
  password!: string;
}
