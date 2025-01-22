import dayjs from 'dayjs';

export const logInfo = (name: string, input?: any, output?: any) => {
  console.log(
    `${dayjs().format(
      'HH:mm:ss DD/MM/YYYY'
    )} - [${name}] || INFO || Input: ${JSON.stringify(
      input
    )} || Output: ${JSON.stringify(output)} \n`
  );
};
export const logEvent = (name: string, input?: any, output?: any) => {
  console.log(
    `${dayjs().format(
      'HH:mm:ss DD/MM/YYYY'
    )} - [${name}] || EVENT || Input: ${JSON.stringify(
      input
    )} || Output: ${JSON.stringify(output)} \n`
  );
};
export const logError = (name: string, input?: any, output?: any) => {
  console.log(
    `${dayjs().format(
      'HH:mm:ss DD/MM/YYYY'
    )} - [${name}] || ERROR || Input: ${JSON.stringify(
      input
    )}|| Output: ${JSON.stringify(output)} \n`
  );
};
