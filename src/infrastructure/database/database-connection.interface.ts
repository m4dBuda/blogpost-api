import { IUserRepository } from 'src/modules/user/interfaces/user-repository.interface';

export interface IDatabaseConnection {
  user: IUserRepository;
}
