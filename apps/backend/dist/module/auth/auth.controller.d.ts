import { AuthService } from './auth.service';
import { SignUpDto } from './dto/signUp.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    signUp(dto: SignUpDto): Promise<{
        data: {
            message: string;
            user: {
                id: import("mongoose").Types.ObjectId;
                email: string;
                role: string;
            };
        };
    }>;
    test(): {
        message: string;
    };
}
