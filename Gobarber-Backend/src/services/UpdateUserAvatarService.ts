import { getRepository } from 'typeorm';
import path from 'path';
import fs from 'fs';

import uploadConfig from '../config/upload';
import User from '../models/User';

interface RequestDTO {
  user_id: string;
  avatarFilename: string;
}

class UpdateUserAvatarservice {
  public async execute({ user_id, avatarFilename }: RequestDTO): Promise<User> {
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne(user_id);
    if (!user) {
      throw new Error('Only authenticated user can change avatar');
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
    await usersRepository.save(user);

    return user;
  }
}

export default UpdateUserAvatarservice;
