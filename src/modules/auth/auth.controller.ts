import { Body, Controller, Inject, Post } from '@nestjs/common';
import { LoginDTO } from './dtos/inputs/login.dto';
import { AuthDTO } from './dtos/outputs/auth.dto';
import { LoginUseCase } from './use-cases/login.usecase';

@Controller('auth')
export class AuthController {
  constructor(@Inject(LoginUseCase) private readonly loginUseCase: LoginUseCase) {}

  @Post('login')
  public async login(@Body() data: LoginDTO): Promise<AuthDTO> {
    return this.loginUseCase.execute(data);
  }
}
