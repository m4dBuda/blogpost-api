import { CanActivate, ExecutionContext, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { IUserRepository } from 'src/modules/user/interfaces/user-repository.interface';
import { UserRepository } from 'src/modules/user/user.repository';
import { AuthenticatedRequest } from '../dtos/authenticated-request.dto';
import { TokenDTO } from '../dtos/token.dto';
import { JwtHelper } from '../helpers/jwt.helper';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    @Inject(UserRepository)
    private readonly userRepository: IUserRepository,
    private readonly jwtHelper: JwtHelper,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<AuthenticatedRequest>();
    const token = this.extractToken(request.headers['authorization']);
    const payload: TokenDTO = this.jwtHelper.verifyToken(token);
    const user = await this.userRepository.findById(payload.id);
    if (!user) throw new UnauthorizedException('User not found');
    request.user = user;
    return true;
  }

  private extractToken(authHeader?: string): string {
    if (!authHeader?.startsWith('Bearer ')) throw new UnauthorizedException('Invalid authorization format');
    return authHeader.split(' ')[1];
  }
}
