import path from 'path';
import fs from 'fs';

import AppError from '@shared/errors/AppError';
import uploadConfig from '@config/upload';
import User from '@modules/users/infra/typeorm/entities/User';
import IUsersRepository from '../repositories/IUserRepository';

interface IRequestDTO {
  user_id: string;
  avatarFilename: string;
}

class UpdateUserAvatarservice {
  constructor(private userRepository: IUsersRepository) {}

  public async execute({
    user_id,
    avatarFilename,
  }: IRequestDTO): Promise<User> {
    const user = await this.userRepository.findById(user_id);
    if (!user) {
      throw new AppError('Only authenticated user can change avatar', 401);
    }

    if (user.avatar) {
      // deletar avatar anterior
      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);
      // fs = file system ... eh uma biblioteca do proprio node
      const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);

      if (userAvatarFileExists) {
        await fs.promises.unlink(userAvatarFilePath);
      }
    }

    user.avatar = avatarFilename;
    await this.userRepository.save(user);

    return user;
  }
}

export default UpdateUserAvatarservice;
