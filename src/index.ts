import './util/configs';
import options from './config/options';
import logger from './util/logger';
import dotEnv from 'dotenv';

dotEnv.config();
(async () => {
  try {
    await options.waitForFirstSnapshot({ timeout: 10000 }, __dirname, './main');
    logger.debug({ options: options.snapshot() }, 'CONFIG-SNAPSHOT - OK');
  } catch (err) {
    logger.error(err, 'CONFIG-SNAPSHOT - KO');
  }
})();
