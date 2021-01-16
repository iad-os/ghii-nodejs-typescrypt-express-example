import express from 'express';
import 'express-async-errors';
import pinoExpress from 'express-pino-logger';
import helmet from 'helmet';
import cors from 'cors';
import bodyParser from 'body-parser';
import compression from 'compression';
import opts from './options';
import logger from '../util/logger';

//import baseRouter from '../routes';
//import { defaultHandler, clientErrorHandler } from '../libs/errors';

const expressApp =
  /**
   * Create HTTP server.
   */

  express()
    .use(helmet())
    // check docs https://github.com/expressjs/cors#configuration-options
    .use(cors())
    .use(compression())
    // .options('*', cors())
    // .use(cookieSession({ secret: process.env.COOKIE_SECRET }))
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({ extended: false }))
    .use(
      pinoExpress({
        logger,
      })
    );
export default expressApp;
