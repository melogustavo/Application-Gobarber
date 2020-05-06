import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import authConfig from '@config/auth';

import AppError from '@shared/errors/AppError';
import User from '@modules/users/infra/typeorm/entities/User';
import IUsersRepository from '../repositories/IUserRepository';

interface IRequestDTO {
  email: string;
  password: string;
}

interface IResponse {
  user: User;
  token: string;
}

class AuthenticateUserService {
  constructor(private userRepository: IUsersRepository) {}

  public async execute({ email, password }: IRequestDTO): Promise<IResponse> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Incorrect email/password combination', 401);
    }

    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) {
      throw new AppError('Incorrect email/password combination', 401);
    }

    // 1 parametro: payload (informacoes adicionais que vc quer enviar, porem nao envia informacoes sigilosas porque nao eh seguro)
    // 2 parametro: chave secreta
    // 3 parametro: configuracoes do nosso token
    const token = sign({}, authConfig.jwt.secret, {
      subject: user.id,
      expiresIn: authConfig.jwt.expiresIn,
    });

    return {
      user,
      token,
    };
  }
}

export default AuthenticateUserService;
