import waitOn from 'wait-on';
import apiServer from './config/apiServer';
import logger from './util/logger';

//import { name, version, description, repository } from 'package.json';
//logger.info('App Boot info', { name, version, description, repository });
export async function start(): Promise<void> {
  // const {} = process.env;
  try {
    // await something
    // once here, all resources are available
    process.on('SIGINT', async () => {
      stop();
    });

    process.on('SIGTERM', async () => {
      stop();
      //setInterval(() => process.exit(), 1000);
    });
    apiServer.start();
  } catch (err) {
    logger.debug('💥 ops', err);
    throw err;
  }
  // eslint-disable-next-line global-require
}

async function stop(): Promise<void> {
  await apiServer.stop();
  //setInterval(() => process.exit(), 1000);
}
export async function engineCheck(): Promise<void> {
  // some check before starting the api server
  return;
}
export default {
  start,
  stop,
  engineCheck,
};
