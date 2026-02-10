import { AuthService } from './auth.service';
import { SignUpDto } from './dto/signUp.dto';
import { LoginDto } from './dto/login.dto';
import type { Request, Response } from 'express';
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
    login(dto: LoginDto, res: Response): Promise<{
        message: string;
        userData: {
            _id: import("mongoose").Types.ObjectId;
            $locals: Record<string, unknown>;
            $op: "save" | "validate" | "remove" | null;
            $where: Record<string, unknown>;
            baseModelName?: string;
            collection: import("mongoose").Collection;
            db: import("mongoose").Connection;
            errors?: import("mongoose").Error.ValidationError;
            isNew: boolean;
            schema: import("mongoose").Schema;
            name: string;
            email: string;
            password: string;
            role: string;
            __v: number;
            id: string;
        };
    }>;
    logout(res: Response): {
        message: string;
    };
    refreshToken(req: Request & {
        cookies: {
            refreshToken?: string;
        };
    }, res: Response): Promise<{
        message: string;
    }>;
}
