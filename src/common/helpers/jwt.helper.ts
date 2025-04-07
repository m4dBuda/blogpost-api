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

  /**
   * Generates a JWT token with the given payload.
   * @param payload - The payload to include in the token.
   * @param expiresIn - Optional expiration time in seconds (overrides default).
   * @returns The generated JWT token.
   */
  public generateToken(payload: object, expiresIn?: number): string {
    const token: string = this.jwtService.sign(payload, {
      secret: this.secret,
      expiresIn: expiresIn ?? this.expiresIn,
    });
    return token;
  }

  /**
   * Verifies a JWT token.
   * @param token - The JWT token to verify.
   * @returns The decoded payload if the token is valid.
   */
  public verifyToken(token: string): TokenDTO {
    return this.jwtService.verify(token, { secret: this.secret });
  }
}
