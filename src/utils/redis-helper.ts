import { createClient, RedisClientType } from 'redis';
let redisInstance: RedisClientType;

export const initRedis = async () => {
  const redisURI = process.env.REDIS_URI || '';

  redisInstance = createClient({
    url: redisURI,
  });
  await redisInstance
    .on('ready', () =>
      console.log('=========== Connected to Redis ===========')
    )
    .connect();
};
export const redisSet = async (
  key: string,
  data: any,
  expiresInSeconds: number
): Promise<void> => {
  const app_name = process.env.APP_NAME || '';
  await redisInstance.setEx(
    `${key}_${app_name}`,
    expiresInSeconds,
    JSON.stringify(data)
  );
};

export const redisGet = async (key: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    const app_name = process.env.APP_NAME || '';
    redisInstance
      .get(`${key}_${app_name}`)
      .then((data) => {
        resolve(data ? JSON.parse(data) : null);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const redisDel = async (key: string): Promise<void> => {
  const app_name = process.env.APP_NAME || '';
  const keyCache = `${key}_${app_name}`;
  const keyList = await redisInstance.keys(keyCache);
  if (keyList.length > 0) {
    await redisInstance.del(keyList);
  }
};

export const redisSetSortedSet = async (
  key: string,
  value: any,
  score: number
) => {
  const app_name = process.env.APP_NAME || '';
  await redisInstance.zAdd(`${key}_${app_name}`, {
    score,
    value: JSON.stringify(value),
  });
};
export const redisGetSortedSet = async (
  key: string,
  limit: number,
  offset: number
) => {
  const app_name = process.env.APP_NAME || '';
  return await redisInstance.zRange(`${key}_${app_name}`, limit, offset);
};
