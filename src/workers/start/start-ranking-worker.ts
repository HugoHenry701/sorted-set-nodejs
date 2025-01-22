import { initRedis, redisSetSortedSet } from '../../utils/redis-helper';
import { parentPort } from 'worker_threads';

initRedis();

if (parentPort) {
  parentPort.on('message', (message) => {
    const keyRankingStart = `ranking-start`;
    redisSetSortedSet(keyRankingStart, JSON.stringify(message), message.price);
  });
}
