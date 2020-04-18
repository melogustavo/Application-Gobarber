// Session = Autenticacao de login
import { Router } from 'express';

import AuthenticateService from '../services/AuthenticateUserService';

const sessiosRouter = Router();

sessiosRouter.post('/', async (request, response) => {
  try {
    const { email, password } = request.body;

    const authenticate = new AuthenticateService();

    const { user, token } = await authenticate.execute({ email, password });

    delete user.password;

    return response.json({ user, token });
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default sessiosRouter;