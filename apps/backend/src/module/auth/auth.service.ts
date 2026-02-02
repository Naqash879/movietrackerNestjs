/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import bcrypt from 'bcrypt';
import { SignUpDto } from './dto/signUp.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schema/auth.schema';
import { Model } from 'mongoose';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
    private jwtService: JwtService,
  ) {}
  async signUp(dto: SignUpDto) {
    try {
      const user = await this.userModel.findOne({ email: dto.email });
      if (user) {
        throw new ConflictException('Email already exists');
      }

      const passwordHashed = await bcrypt.hash(dto.password, 10);

      const newUser = new this.userModel({
        name: dto.name,
        email: dto.email,
        password: passwordHashed,
      });

      const savedUser = await newUser.save();

      return {
        message: 'User registered successfully',
        user: {
          id: savedUser._id,
          email: savedUser.email,
          role: savedUser.role,
        },
      };
    } catch (error) {
      if (error instanceof ConflictException) {
        throw error;
      }

      throw new InternalServerErrorException(
        error?.message || 'Something went wrong',
      );
    }
  }
  async loginCheck(dto: LoginDto) {
    try {
      const user = await this.userModel
        .findOne({ email: dto.email })
        .select('+password');

      if (!user) {
        throw new UnauthorizedException('User not found');
      }

      const checkPassword = await bcrypt.compare(dto.password, user.password);

      if (!checkPassword) {
        throw new UnauthorizedException('Password not correct');
      }

      const { password, ...userData } = user.toObject();
      const accessToken = this.jwtService.sign(
        {
          id: userData._id,
          email: userData.email,
          role: userData.role,
        },
        { expiresIn: '15m' },
      );
      const refreshToken = this.jwtService.sign(
        {
          id: userData._id,
          email: userData.email,
          role: userData.role,
        },
        { expiresIn: '7d' },
      );

      return {
        message: 'User login successfully',
        userData,
        accessToken,
        refreshToken,
      };
    } catch (error) {
      if (
        error instanceof UnauthorizedException ||
        error instanceof BadRequestException
      ) {
        throw error;
      }
      throw new InternalServerErrorException(
        error?.message ||
          'Something went wrong while checking login credentials',
      );
    }
  }
}
