import ghii from '@ghii/ghii';
import yamlLoader from '@ghii/yaml-loader';

export const APP_NAME = 'ghii-ts-express-example';
export const APP_DB_NAME = 'bootFatherApi';
export const options = ghii<{
  env: 'development' | 'production';
  apis: {
    wellKnown: string;
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
  .loader(
    yamlLoader(
      ...(process.env.CONFIG_FILE
        ? [process.env.CONFIG_FILE]
        : [__dirname, './.rc.yml'])
    )
  );

export default options;
