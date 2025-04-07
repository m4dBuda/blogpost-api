import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TokenDTO } from '../dtos/token.dto';

@Injectable()
export class JwtHelper {
  private readonly secret: string;
  private readonly expiresIn: string;

  constructor(private readonly jwtService: JwtService) {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      throw new Error('Secret is not defined in the environment variables');
    }
    this.secret = secret;

    this.expiresIn = process.env.JWT_EXPIRES_IN || '3600';
  }

  public generateToken(payload: object, expiresIn?: number): string {
    const token: string = this.jwtService.sign(payload, {
      secret: this.secret,
      expiresIn: expiresIn ?? this.expiresIn,
    });
    return token;
  }

  public verifyToken(token: string): TokenDTO {
    return this.jwtService.verify(token, { secret: this.secret });
  }
}
