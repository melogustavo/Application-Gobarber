// Session = Autenticacao de login
import { Router } from 'express';
import { container } from 'tsyringe';

import AuthenticateService from '@modules/users/services/AuthenticateUserService';

const sessiosRouter = Router();

sessiosRouter.post('/', async (request, response) => {
  const { email, password } = request.body;

  const authenticate = container.resolve(AuthenticateService);

  const { user, token } = await authenticate.execute({ email, password });

  delete user.password;

  return response.json({ user, token });
});

export default sessiosRouter;
