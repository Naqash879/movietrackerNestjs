/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import bcrypt from 'bcrypt';
import { SignUpDto } from './dto/signUp.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schema/auth.schema';
import { Model } from 'mongoose';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
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
}
