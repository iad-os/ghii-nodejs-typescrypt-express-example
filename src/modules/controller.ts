import { RequestHandler } from 'express';
import { next, value } from './sequenceGenerator';

const nextValue: RequestHandler = async function (req, res) {
  res.json({ next: await next() });
};

const currentValue: RequestHandler = async function (req, res) {
  res.json({ value: await value() });
};
export { nextValue, currentValue };
