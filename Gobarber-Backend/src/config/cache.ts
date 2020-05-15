import { RedisOptions } from 'ioredis';

interface ICacheConfig {
  driver: 'redis';

  config: {
    redis: RedisOptions;
  };
}

// vc ja ta criando assim, pensando que futuramente vc pode ter diversos tipos de apis de cache
export default {
  driver: 'redis',

  config: {
    redis: {
      host: 'localhost',
      port: 6379,
      password: undefined,
    },
  },
} as ICacheConfig;
