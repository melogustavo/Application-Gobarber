// Session = Autenticacao de login
import { Router } from 'express';

import UsersRepository from '@modules/users/infra/typeorm/repositories/UserRepository';
import AuthenticateService from '@modules/users/services/AuthenticateUserService';

const sessiosRouter = Router();

sessiosRouter.post('/', async (request, response) => {
  const userRepository = new UsersRepository();

  const { email, password } = request.body;

  const authenticate = new AuthenticateService(userRepository);

  const { user, token } = await authenticate.execute({ email, password });

  delete user.password;

  return response.json({ user, token });
});

export default sessiosRouter;
