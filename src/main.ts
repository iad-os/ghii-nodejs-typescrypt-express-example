import waitOn from 'wait-on';
import log from './util/logger';
import * as apiService from './main-http';
import opts from './config/options';
import Hub from './util/Hub';
import AppMonitor from './util/AppMonitor';
// import { checkIntrospectCredentials } from '@iad-os/oidc-smart-introspect';

(async () => {
  process.on('SIGINT', Hub.captureEventAs('exit'));

  process.on('SIGTERM', Hub.captureEventAs('exit'));

  Hub.on('exit', AppMonitor.appFastFail);
  Hub.on('fatal', AppMonitor.appFastFail);

  try {
    log.info('🔍 Running engineCheck ...');
    await engineCheck({});
    log.info('✅ Running engineCheck OK');
    await start();
    log.info('✅ Application started');
  } catch (err) {
    log.error({ err }, '💥 BAD things happened');
  }
})();
//import { name, version, description, repository } from 'package.json';
//logger.info('App Boot info', { name, version, description, repository });
export async function start(): Promise<void> {
  try {
    // await something
    // once here, all resources are available
    //mongoService.start();
    apiService.start();
  } catch (err) {
    log.debug(err, '💥 ops');
    throw err;
  }
  // eslint-disable-next-line global-require
}

export async function engineCheck(options: {
  waitOpts?: waitOn.WaitOnOptions;
  envs?: { [name: string]: string };
}): Promise<void> {
  const { waitOpts } = options;
  //await mongoService.engineCheck();
  await apiService.engineCheck();
  // await checkIntrospectCredentials(opts.snapshot().oidcSmartIntrospect);

  if (opts.snapshot().env === 'development' && waitOpts) waitOn(waitOpts);
}
