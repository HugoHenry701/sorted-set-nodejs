import { parentPort, workerData } from 'worker_threads';

if (parentPort) {
  let count = 0;
  for (let i = 0; i < 8_000_000_000 / workerData.THREAD_COUNT; i++) {
    count++;
  }
  parentPort.postMessage(count);
}
