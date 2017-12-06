import path from 'path';
import express from 'express';
import helmet from 'helmet';
import appHandler from './handlers/app';
import notFoundHandler from './handlers/notFound';
import devMiddleware from './middlewares/dev';

const { npm_package_config_port: PORT, NODE_ENV } = process.env;
const app = express();

app.use(helmet());

app.use(express.static(path.resolve('./public'), { index: false }));

if (NODE_ENV !== 'production') {
  app.use(devMiddleware);
}

app.get('/*', appHandler);

app.use(notFoundHandler);

app.listen(PORT, () => console.info(`Express server listening on port ${PORT}`));
