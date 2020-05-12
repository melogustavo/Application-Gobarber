import AppError from '@shared/errors/AppError';

import FakeUserRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import AuthenticateUserService from './AuthenticateUserService';
import CreateUserService from './CreateUserService';

let fakeUserRepository: FakeUserRepository;
let fakeHashProvider: FakeHashProvider;
let authenticateUserService: AuthenticateUserService;
let createUserService: CreateUserService;

describe('Authenticate User', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    fakeHashProvider = new FakeHashProvider();

    authenticateUserService = new AuthenticateUserService(
      fakeUserRepository,
      fakeHashProvider,
    );

    createUserService = new CreateUserService(
      fakeUserRepository,
      fakeHashProvider,
    );
  });
  it('should be able to authenticate', async () => {
    const user = await createUserService.execute({
      email: 'gustavo@email.com',
      name: 'gustavo',
      password: '123456',
    });

    const reponse = await authenticateUserService.execute({
      email: 'gustavo@email.com',
      password: '123456',
    });

    expect(reponse).toHaveProperty('token');
    expect(reponse.user).toEqual(user);
  });

  it('should not able to authenticate with non existing user', async () => {
    await expect(
      authenticateUserService.execute({
        email: 'gustavo@email.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate with wrong password', async () => {
    await createUserService.execute({
      email: 'gustavo@email.com',
      name: 'gustavo',
      password: '123456',
    });

    await expect(
      authenticateUserService.execute({
        email: 'gustavo@email.com',
        password: '99999',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
