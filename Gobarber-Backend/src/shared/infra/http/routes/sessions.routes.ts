// Session = Autenticacao de login
import { Router } from 'express';

import AuthenticateService from '../services/AuthenticateUserService';

const sessiosRouter = Router();

sessiosRouter.post('/', async (request, response) => {
  const { email, password } = request.body;

  const authenticate = new AuthenticateService();

  const { user, token } = await authenticate.execute({ email, password });

  delete user.password;

  return response.json({ user, token });
});

export default sessiosRouter;
