import AppError from '@shared/errors/AppError';
import FakeUserRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider';
import UpdateUserAvatarService from './UpdateUserAvatarService';

let fakeUserRepository: FakeUserRepository;
let fakeStorageProvider: FakeStorageProvider;
let updateUserAvatarService: UpdateUserAvatarService;

describe('Update User avatar', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    fakeStorageProvider = new FakeStorageProvider();

    updateUserAvatarService = new UpdateUserAvatarService(
      fakeUserRepository,
      fakeStorageProvider,
    );
  });
  it('should add avatar to existing user', async () => {
    const user = await fakeUserRepository.create({
      email: 'gustavo@email.com',
      name: 'gustavo',
      password: '123456',
    });

    await updateUserAvatarService.execute({
      user_id: user.id,
      avatarFilename: 'avatar.png',
    });

    expect(user.avatar).toBe('avatar.png');
  });

  it('should not add avatar to non-existing user', async () => {
    await expect(
      updateUserAvatarService.execute({
        user_id: '123',
        avatarFilename: 'avatar.png',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should delete old avatar when updating new one', async () => {
    // Vc esta espionando o metodo pra verificar se ele foi acionado ou nao... nesse caso vc precisa disso porque nao tem como vc verificar se o deletefile foi acionado
    const deleteFile = jest.spyOn(fakeStorageProvider, 'deleteFile');

    const user = await fakeUserRepository.create({
      email: 'gustavo@email.com',
      name: 'gustavo',
      password: '123456',
    });

    await updateUserAvatarService.execute({
      user_id: user.id,
      avatarFilename: 'avatar.png',
    });

    await updateUserAvatarService.execute({
      user_id: user.id,
      avatarFilename: 'avatar2.png',
    });

    expect(deleteFile).toHaveBeenCalledWith('avatar.png');
    expect(user.avatar).toBe('avatar2.png');
  });
});
