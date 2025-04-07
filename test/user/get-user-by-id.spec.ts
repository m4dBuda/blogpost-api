import { HttpException, NotFoundException } from '@nestjs/common';
import { UserDTO } from '../../src/modules/user/dtos/outputs/user.dto';
import { IUserRepository } from '../../src/modules/user/interfaces/user-repository.interface';
import { GetUserByIdUseCase } from '../../src/modules/user/use-cases/get-user-by-id.usecase';

describe('GetUserByIdUseCase', () => {
  let useCase: GetUserByIdUseCase;
  let userRepository: jest.Mocked<IUserRepository>;

  beforeEach(() => {
    userRepository = {
      findById: jest.fn(),
    } as unknown as jest.Mocked<IUserRepository>;

    useCase = new GetUserByIdUseCase(userRepository);
  });

  it('should return a UserDTO when the user is found', async () => {
    const mockUser = {
      id: '1',
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: 'hashedpassword',
      createdAt: new Date(),
      updatedAt: new Date(),
      posts: [{ id: 'post1' }, { id: 'post2' }],
      likes: [{ id: 'like1' }],
      comments: [{ id: 'comment1' }, { id: 'comment2' }],
    };

    userRepository.findById.mockResolvedValue(mockUser);

    const result = await useCase.execute('1');

    expect(result).toBeInstanceOf(UserDTO);
    expect(result).toEqual(
      new UserDTO(mockUser, {
        postCount: 2,
        likeCount: 1,
        commentCount: 2,
      }),
    );
    expect(userRepository.findById).toHaveBeenCalledWith('1');
  });

  it('should throw NotFoundException when the user is not found', async () => {
    userRepository.findById.mockResolvedValue(null);

    await expect(useCase.execute('1')).rejects.toThrow(NotFoundException);
    expect(userRepository.findById).toHaveBeenCalledWith('1');
  });

  it('should throw HttpException when an unexpected error occurs', async () => {
    userRepository.findById.mockRejectedValue(new HttpException(`Error retrieving user:`, 500));

    await expect(useCase.execute('1')).rejects.toThrow(HttpException);
    expect(userRepository.findById).toHaveBeenCalledWith('1');
  });
});
