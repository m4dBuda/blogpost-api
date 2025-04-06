import { Inject, Injectable } from '@nestjs/common';
import { HashHelper } from 'src/common/helpers/hash.helper';
import { JwtHelper } from 'src/common/helpers/jwt.helper';
import { IUserRepository } from 'src/modules/user/interfaces/user-repository.interface';
import { UserEntity } from 'src/modules/user/user.entity';
import { UserRepository } from 'src/modules/user/user.repository';
import { LoginDTO } from '../dtos/inputs/login.dto';
import { AuthDTO } from '../dtos/outputs/auth.dto';

@Injectable()
export class LoginUseCase {
  constructor(
    @Inject(UserRepository) private readonly userRepository: IUserRepository,
    @Inject(HashHelper) private readonly hashHelper: HashHelper,
    @Inject(JwtHelper) private readonly jwtHelper: JwtHelper,
  ) {}

  public async execute(data: LoginDTO): Promise<AuthDTO> {
    try {
      const user = await this.validateUser(data.email);
      await this.validatePassword(user, data.password);
      const token = await this.generateToken(user);
      return new AuthDTO(user.id, token);
    } catch (error) {
      throw new Error(`Login failed: ${error.message}`);
    }
  }

  private async validateUser(email: string): Promise<UserEntity> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }

  private async validatePassword(user: UserEntity, password: string): Promise<boolean> {
    const isValid = await this.hashHelper.compare(password, user.password);
    if (!isValid) {
      throw new Error('Invalid password');
    }
    return isValid;
  }

  private async generateToken(user: UserEntity): Promise<string> {
    return this.jwtHelper.generateToken({ id: user.id });
  }
}
