import { Body, Controller, Get, Inject, Post, Request, UseGuards } from '@nestjs/common';
import { AuthenticatedRequest } from '../../common/dtos/authenticated-request.dto';
import { AuthGuard } from '../../common/guards/auth.guard';
import { CreateUserDTO } from './dtos/inputs/create-user.dto';
import { UserCreatedDTO } from './dtos/outputs/user-created.dto';
import { UserDTO } from './dtos/outputs/user.dto';
import { CreateUserUseCase } from './use-cases/create-user.usecase';
import { GetUserByIdUseCase } from './use-cases/get-user-by-id.usecase';

@Controller('user')
export class UserController {
  constructor(
    @Inject(CreateUserUseCase) private readonly $create: CreateUserUseCase,
    @Inject(GetUserByIdUseCase) private readonly $getById: GetUserByIdUseCase,
  ) {}

  @Post()
  public async create(@Body() data: CreateUserDTO): Promise<UserCreatedDTO> {
    return this.$create.execute(data);
  }

  @UseGuards(AuthGuard)
  @Get()
  public async getById(@Request() req: AuthenticatedRequest): Promise<UserDTO> {
    const id = req.user.id;
    return this.$getById.execute(id);
  }
}
