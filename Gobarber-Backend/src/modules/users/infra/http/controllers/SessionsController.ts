import { Request, Response } from 'express';
import { container } from 'tsyringe';

import AuthenticateService from '@modules/users/services/AuthenticateUserService';

export default class SessionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const authenticate = container.resolve(AuthenticateService);

    const { user, token } = await authenticate.execute({ email, password });

    delete user.password;

    return response.json({ user, token });
  }
}
