import { Start } from '../models/start';

export const StartSeed = async () => {
  await Start.deleteMany()
    .then(() => {
      console.log('Start is Cleared');
    })
    .catch((error) => {
      console.log(error);
    });
  var data = [
    { title: 'abc', price: 123 },
    { title: 'def', price: 234 },
    { title: 'ghi', price: 345 },
    { title: 'klm', price: 456 },
  ];
  for (let i = 0; i < data.length; i++) {
    const start = Start.build(data[i]);
    await start.save().catch((error) => {
      console.log(error);
    });
  }
  console.log('Start is Seeded');
};
