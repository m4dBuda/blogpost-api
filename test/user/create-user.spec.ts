import { HttpException } from '@nestjs/common';
import { HashHelper } from '../../src/common/helpers/hash.helper';
import { CreateUserDTO } from '../../src/modules/user/dtos/inputs/create-user.dto';
import { UserCreatedDTO } from '../../src/modules/user/dtos/outputs/user-created.dto';
import { IUserRepository } from '../../src/modules/user/interfaces/user-repository.interface';
import { CreateUserUseCase } from '../../src/modules/user/use-cases/create-user.usecase';

describe('CreateUserUseCase', () => {
  let useCase: CreateUserUseCase;
  let userRepository: jest.Mocked<IUserRepository>;
  let hashHelper: jest.Mocked<HashHelper>;

  beforeEach(() => {
    userRepository = {
      create: jest.fn(),
    } as unknown as jest.Mocked<IUserRepository>;

    hashHelper = {
      hash: jest.fn(),
    } as unknown as jest.Mocked<HashHelper>;

    useCase = new CreateUserUseCase(userRepository, hashHelper);
  });

  it('should create a user and return UserCreatedDTO', async () => {
    const mockUser = {
      id: '1',
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: 'hashedpassword',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const mockCreateUserDTO: CreateUserDTO = {
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: 'securepassword',
    };

    hashHelper.hash.mockResolvedValue('hashedpassword');
    userRepository.create.mockResolvedValue(mockUser);

    const result = await useCase.execute(mockCreateUserDTO);

    expect(result).toBeInstanceOf(UserCreatedDTO);
    expect(result).toEqual(new UserCreatedDTO(mockUser));
    expect(hashHelper.hash).toHaveBeenCalledWith('securepassword');
    expect(userRepository.create).toHaveBeenCalledWith({
      ...mockCreateUserDTO,
      password: 'hashedpassword',
    });
  });

  it('should throw HttpException when an unexpected error occurs', async () => {
    const mockCreateUserDTO: CreateUserDTO = {
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: 'securepassword',
    };

    userRepository.create.mockRejectedValue(new Error('Database error'));

    await expect(useCase.execute(mockCreateUserDTO)).rejects.toThrow(HttpException);
    expect(hashHelper.hash).toHaveBeenCalledWith('securepassword');
    expect(userRepository.create).toHaveBeenCalled();
  });
});
