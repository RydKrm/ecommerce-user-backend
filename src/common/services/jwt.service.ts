import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

interface Payload{
    role:string,
    id:number
}

@Injectable()
export class TokenService{
    constructor(private jwtService:JwtService){}
    // for create jwt token
    async createToken(payload:Payload):Promise<string>{
        const tokenSign = process.env.JWT_TOKEN || "default-token-checker";
        const token = this.jwtService.sign(payload,{secret:tokenSign});
        return token;
    }

    // Check JWT token
    async checkToken(token: string): Promise<Payload | boolean> {
        try {
            const payload = this.jwtService.verify(token); // Verify the token
            return payload; // Return the payload if valid
        } catch (error) {
            // Handle token verification errors
            if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
                return false; // Return false if the token is invalid or expired
            }
            throw new UnauthorizedException(); // Throw an exception for unexpected errors
        }
    }

}