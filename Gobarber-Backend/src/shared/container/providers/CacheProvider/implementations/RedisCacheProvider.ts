import Redis, { Redis as RedisClient } from 'ioredis';
import cacheConfig from '@config/cache';
import ICacheProvider from '../models/ICacheProvider';

export default class RedisCacheProvider implements ICacheProvider {
  private client: RedisClient;

  constructor() {
    this.client = new Redis(cacheConfig.config.redis);
  }

  // Toda string que agnt salvar, vamos salvar no formato de json
  public async save(key: string, value: any): Promise<void> {
    await this.client.set(key, JSON.stringify(value));
  }

  public async recover<T>(key: string): Promise<T | null> {
    const data = await this.client.get(key);

    if (!data) {
      return null;
    }
    // Vc coloca esse as T para falar pra ele que o tipo de retorno quando ele fizer o parse vai ser do mesmo tipo que a pessoa tiver definido quando chamado o metodo
    const parsedData = JSON.parse(data) as T;

    return parsedData;
  }

  public async invalidate(key: string): Promise<void> {
    await this.client.del(key);
  }

  public async invalidatePrefix(prefix: string): Promise<void> {
    // Esse .keys vai pegar todas as chaves que comecarem com o que tiver dentro da string
    const keys = await this.client.keys(`${prefix}:*`);

    // Serve para vc fazer multiplas operacoes sem que uma trava a outra
    const pipeline = this.client.pipeline();

    // Deletar tudo que tiver com a chave la.
    keys.forEach((key) => pipeline.del(key));

    // executar a pipeline
    await pipeline.exec();
  }
}
