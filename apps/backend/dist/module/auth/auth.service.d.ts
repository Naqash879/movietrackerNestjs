import { SignUpDto } from './dto/signUp.dto';
import { UserDocument } from './schema/auth.schema';
import { Model } from 'mongoose';
export declare class AuthService {
    private userModel;
    constructor(userModel: Model<UserDocument>);
    signUp(dto: SignUpDto): Promise<{
        message: string;
        user: {
            id: import("mongoose").Types.ObjectId;
            email: string;
            role: string;
        };
    }>;
}
