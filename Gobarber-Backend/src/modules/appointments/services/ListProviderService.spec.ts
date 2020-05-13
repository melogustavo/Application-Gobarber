// import AppError from '@shared/errors/AppError';
import FakeUserRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import ListProviderService from './ListProviderService';

let fakeUserRepository: FakeUserRepository;
let listProviderService: ListProviderService;

describe('List Provider', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();

    listProviderService = new ListProviderService(fakeUserRepository);
  });
  it('should be able to list the providers', async () => {
    const user1 = await fakeUserRepository.create({
      email: 'gustavo@email.com',
      name: 'gustavo',
      password: '123456',
    });

    const user2 = await fakeUserRepository.create({
      email: 'teste@email.com',
      name: 'teste',
      password: '123456',
    });

    const loggedUser = await fakeUserRepository.create({
      email: 'teste1@email.com',
      name: 'teste1',
      password: '123456',
    });

    const providers = await listProviderService.execute({
      user_id: loggedUser.id,
    });

    expect(providers).toEqual([user1, user2]);
  });
});
