import { EventEmitter } from 'events';
import logger from './logger';

export class HubEventEmitter extends EventEmitter {
  constructor() {
    super();
    this.captureEventAs.bind(this);
    // this.healthcheck.bind(this);
  }
  captureEventAs(eventName: string) {
    return (...data: any) => this.emit(eventName, ...data);
  }

  healthcheck = (): Promise<void> => {
    const listeners = this.listeners('healthcheck');
    return listeners?.length
      ? Promise.all(
          listeners.map(hcHandler => {
            return new Promise<void>((resolve, reject) => {
              const next = (err?: Error | unknown, msg?: string) => {
                if (err) {
                  logger.error({ err, msg });
                  return reject({ err, msg });
                }
                resolve();
              };
              hcHandler(next);
            });
          })
        )
          .then(() => Promise.resolve())
          .catch(err => Promise.reject(err))
      : Promise.resolve();
  };
}

const Hub = new HubEventEmitter();

export default Hub;
