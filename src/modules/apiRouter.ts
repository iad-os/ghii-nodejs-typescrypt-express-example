import express from 'express';
import { nextValue, currentValue } from './controller';

const brandFather = express.Router();

brandFather.route('/seq').get(currentValue).post(nextValue);
export default brandFather;
