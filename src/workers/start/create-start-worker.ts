import { Worker } from 'worker_threads';

export const createStartWorker = ({
  THREAD_COUNT,
}: {
  THREAD_COUNT: number;
}) => {
  return new Promise<number>((resolve, reject) => {
    const workerRanking = new Worker(
      './src/workers/start/start-ranking-worker.ts',
      {
        workerData: {
          THREAD_COUNT,
        },
      }
    );
    workerRanking.on('message', (msg: number) => {
      resolve(msg);
    });
    workerRanking.on('error', (msg: string) => {
      reject(`An error occured ${msg}`);
    });
  });
};
