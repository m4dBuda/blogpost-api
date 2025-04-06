import { CreateUserDTO } from '../dtos/inputs/create-user.dto';
import { UserEntity } from '../user.entity';

export interface IUserRepository {
  create(data: CreateUserDTO): Promise<UserEntity>;
  findById(id: string): Promise<UserEntity | null>;
  findByEmail(email: string): Promise<UserEntity | null>;
}
