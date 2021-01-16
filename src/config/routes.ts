import express from 'express';
import apiRouter from '../modules/apiRouter';
const router = express.Router();

router.use('/', apiRouter);
router.use('/v1', apiRouter);
export default router;
