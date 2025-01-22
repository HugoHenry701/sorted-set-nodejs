import { Request, Response } from 'express';
import {
  redisDel,
  redisGet,
  redisSet,
  redisSetSortedSet,
} from '../utils/redis-helper';
import { Start } from '../models/start';
import { TableStats } from '../models/table-stats';

export const createStartService = async (req: Request, res: Response) => {
  const { title, price } = req.body;
  const newStart = await Start.create({
    title,
    price,
  });

  const keyRankingStart = `ranking-start`;
  await redisSetSortedSet(
    keyRankingStart,
    {
      title: newStart.title,
      price: newStart.price,
      id: newStart.id,
    },
    newStart.price
  );

  const totalStartRecord = await Start.countDocuments();
  await TableStats.findOneAndUpdate(
    { table_name: 'Start' },
    {
      total_record: totalStartRecord,
    },
    { upsert: true }
  );

  const keyCacheName = `*start-get-list*`;
  await redisDel(keyCacheName);

  res.send({
    response_status: 1,
    message: 'Create start successful.',
  });
};
