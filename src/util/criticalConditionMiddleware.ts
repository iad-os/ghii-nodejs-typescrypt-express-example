import { Request, Response } from 'express';
import httpStatus from 'http-status';
import logger from './logger';
import Hub from './Hub';
import ErrorResponse from './ErrorResponse';

let isCritical = false;

(async () => {
  logger.info('STARTED criticalConditionMiddleware');
  Hub.on('critical', (event: any) => {
    isCritical = true;
    logger.error(event, '🚑 Server in critical state MODE');
  });
  Hub.on('clear-critical', (event: any) => {
    isCritical = false;
    logger.info(event, '🎉 CLEARED critical state MODE, ready to server');
  });
})();

export function criticalConditionMiddleware(
  req: Request,
  res: Response,
  next: (err?: Error) => void
): void {
  if (isCritical) {
    logger.error(
      { url: req.url },
      '🚨 TERMINATING REQUEST, application in is in CRITICAL STATE MODE'
    );
    next(
      new ErrorResponse(
        httpStatus.SERVICE_UNAVAILABLE,
        'Server is unable to complete requests'
      )
    );
  }
  next();
}
