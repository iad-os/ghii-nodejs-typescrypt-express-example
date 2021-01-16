import ApiServer from '../util/ApiServer';
import { criticalConditionMiddleware } from '../util/criticalConditionMiddleware';
import {
  defaultMiddleware,
  errorResponseMiddleware,
} from '../util/errorsMiddleware';
import app from './express';
import appRouter from './routes';

const apiServer = new ApiServer({
  requestListener: app,
  port: process.env.PORT,
});
app.use(criticalConditionMiddleware);
app.use(appRouter);
app.use(defaultMiddleware);
app.use(errorResponseMiddleware);

export default apiServer;
