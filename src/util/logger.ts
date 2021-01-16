import pino from 'pino';

const options: pino.LoggerOptions | pino.DestinationStream = {
  level: process.env.LOG_LEVEL || 'info',
  prettyPrint: process.env.PRETTY_PRINT === 'true',
};

const logger = pino(options);

if (process.env.NODE_ENV !== 'production') {
  logger.debug('Logging initialized at debug level');
}

export default logger;
