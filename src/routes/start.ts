import express, { Request, Response } from 'express';
import { Start } from '../models/start';
import { NotFoundError } from '../handlers/errors/not-found-error';
import {
  redisDel,
  redisGet,
  redisGetSortedSet,
  redisSet,
  redisSetSortedSet,
} from '../utils/redis-helper';
import { createStartValidator } from '../validator/start';
import { validateRequest } from '../middlewares/validate-request';
import { createStartService } from '../services/start';
import { TableStats } from '../models/table-stats';
import { SECOND_CONFIG } from '../constants/second';
const router = express.Router();

router.get('/api/start', async (req: Request, res: Response) => {
  const { page_size, page_num } = req.query;
  const pageSize = parseInt(page_size as string, 10) || null;
  const pageNum = parseInt(page_num as string, 10) || null;

  /** HIT Cache **/
  const keyCacheName = `start-get-list-${pageSize || ''}-${pageNum || ''}`;
  const cacheData = await redisGet(keyCacheName);
  if (cacheData) {
    res.status(200).send({
      response_status: 1,
      data: cacheData,
    });
    return;
  }
  /** HIT Cache **/

  /** Database **/

  const query = Start.find();

  if (pageSize && pageNum) {
    query.skip((pageNum - 1) * pageSize).limit(pageSize);
  }

  const starts = await query;
  const totalStartRecord = await TableStats.findOne({
    table_name: 'Start',
  });
  /** Database **/

  await redisSet(
    keyCacheName,
    {
      total: totalStartRecord?.total_record,
      length: starts.length,
      starts,
    },
    SECOND_CONFIG.MINUTE
  );
  res.status(200).send({
    response_status: 1,
    data: {
      total: totalStartRecord?.total_record,
      length: starts.length,
      starts,
    },
  });
});
router.post(
  '/api/start',
  createStartValidator,
  validateRequest,
  createStartService
);
router.get('/api/start-ranking', async (req: Request, res: Response) => {
  const keyRankingStart = `ranking-start`;
  const rankingStart = await redisGetSortedSet(keyRankingStart, 0, -1);
  if (rankingStart.length > 0) {
    res.status(200).send({
      response_status: 1,
      data: {
        ranking_start: rankingStart.map((e) => {
          return JSON.parse(e);
        }),
      },
    });
    return;
  }
  const startList = await Start.find();
  await Promise.all(
    startList.map((e) => {
      redisSetSortedSet(keyRankingStart, e, e.price);
    })
  );
  res.status(200).send({
    response_status: 1,
    data: {
      ranking_start: startList,
    },
  });
});
export { router as startRouter };
