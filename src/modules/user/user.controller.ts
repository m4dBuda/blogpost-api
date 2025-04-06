import { Body, Controller, Get, Inject, Param, Post } from '@nestjs/common';
import { CreateUserDTO } from './dtos/inputs/create-user.dto';
import { UserCreatedDTO } from './dtos/outputs/user-created.dto';
import { CreateUserUseCase } from './use-cases/create-user.usecase';
import { GetUserByIdUseCase } from './use-cases/get-user-by-id.usecase';
import { UserEntity } from './user.entity';

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

  @Get(':id')
  public async getById(@Param('id') id: string): Promise<UserEntity> {
    return this.$getById.execute(id);
  }
}
