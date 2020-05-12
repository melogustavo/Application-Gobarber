import AppError from '@shared/errors/AppError';
import FakeUserRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import CreateUserService from './CreateUserService';

let fakeUserRepository: FakeUserRepository;
let fakeHashProvider: FakeHashProvider;
let createUserService: CreateUserService;

describe('Create User', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    fakeHashProvider = new FakeHashProvider();

    createUserService = new CreateUserService(
      fakeUserRepository,
      fakeHashProvider,
    );
  });
  it('should create a new user', async () => {
    const user = await createUserService.execute({
      email: 'gustavo@email.com',
      name: 'gustavo',
      password: '123456',
    });

    expect(user).toHaveProperty('id');
    expect(user.name).toBe('gustavo');
  });

  it('should not create user if email is already being used by another user', async () => {
    await createUserService.execute({
      email: 'gustavo@email.com',
      name: 'gustavo',
      password: '123456',
    });

    await expect(
      createUserService.execute({
        email: 'gustavo@email.com',
        name: 'Ana ',
        password: '789012',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
