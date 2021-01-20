import ghii from '@ghii/ghii';
import httpLoader from '@ghii/http-loader';
import yamlLoader from '@ghii/yaml-loader';

export const APP_NAME = 'ghii-ts-express-example';
export const options = ghii<{
  env: 'development' | 'production';
  apis: {
    wellKnown: string;
  };
  seq: {
    start: number;
  };
}>()
  .section('env', {
    validator: joi => joi.string().allow('development', 'production'),
    defaults: 'production',
  })
  .section('apis', {
    validator: joi =>
      joi.object({ wellKnown: joi.string().required() }).required(),
  })
  .section('seq', {
    validator: joi =>
      joi.object({ start: joi.number().required().min(10) }).required(),
  })
  .loader(
    yamlLoader(
      ...(process.env.CONFIG_FILE
        ? [process.env.CONFIG_FILE]
        : [__dirname, './.rc.yml'])
    )
  )
  .loader(httpLoader('http://127.0.0.1:8080/seq.json', { throwOnError: true }));

export default options;
