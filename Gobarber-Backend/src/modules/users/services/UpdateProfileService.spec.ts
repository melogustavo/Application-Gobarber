import AppError from '@shared/errors/AppError';
import FakeUserRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import UpdateProfileService from './UpdateProfileService';

let fakeUserRepository: FakeUserRepository;
let fakeHashProvider: FakeHashProvider;
let updateProfileService: UpdateProfileService;

describe('Update profile', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    fakeHashProvider = new FakeHashProvider();

    updateProfileService = new UpdateProfileService(
      fakeUserRepository,
      fakeHashProvider,
    );
  });
  it('should be able to update the profile', async () => {
    const user = await fakeUserRepository.create({
      email: 'gustavo@email.com',
      name: 'gustavo',
      password: '123456',
    });

    const updatedUser = await updateProfileService.execute({
      user_id: user.id,
      name: 'JOAO DAS NEVES',
      email: 'joao@email.com',
    });

    expect(updatedUser?.name).toBe('JOAO DAS NEVES');
    expect(updatedUser?.email).toBe('joao@email.com');
  });

  it('should not be able to change the email to a already existing email', async () => {
    const user = await fakeUserRepository.create({
      email: 'gustavo@email.com',
      name: 'gustavo',
      password: '123456',
    });

    await fakeUserRepository.create({
      email: 'teste@email.com',
      name: 'teste',
      password: '123456',
    });

    await expect(
      updateProfileService.execute({
        user_id: user.id,
        name: 'teste DASNEVES',
        email: 'teste@email.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to update the password', async () => {
    const user = await fakeUserRepository.create({
      email: 'gustavo@email.com',
      name: 'gustavo',
      password: '123456',
    });

    const updatedUser = await updateProfileService.execute({
      user_id: user.id,
      name: 'JOAO DAS NEVES',
      email: 'joao@email.com',
      password: '123123',
      old_password: '123456',
    });

    expect(updatedUser?.password).toBe('123123');
  });

  it('should not be able to update profile from non-existing user', async () => {
    expect(
      updateProfileService.execute({
        user_id: 'non-existing',
        email: 'test',
        name: 'test',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update the password without old password', async () => {
    const user = await fakeUserRepository.create({
      email: 'gustavo@email.com',
      name: 'gustavo',
      password: '123456',
    });

    await expect(
      updateProfileService.execute({
        user_id: user.id,
        name: 'JOAO DAS NEVES',
        email: 'joao@email.com',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update the password with wrong old password', async () => {
    const user = await fakeUserRepository.create({
      email: 'gustavo@email.com',
      name: 'gustavo',
      password: '123456',
    });

    await expect(
      updateProfileService.execute({
        user_id: user.id,
        name: 'JOAO DAS NEVES',
        email: 'joao@email.com',
        password: '123123',
        old_password: '111111',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
