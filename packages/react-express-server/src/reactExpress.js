import express from 'express';
import helmet from 'helmet';
import compression from 'compression';
import pinoHttp from 'pino-http';
import logger, { serializers } from './logger';

export default () => {
  const app = express();

  app.use(pinoHttp({ logger, serializers }));
  app.use(compression());
  app.use(helmet());
  app.use((req, res, next) => {
    req.context = {};

    next();
  });

  process.on('SIGINT', () => {
    logger.info(`react-express-server gracefully shutting down from SIGINT (Ctrl-C)`);
    process.exit(0);
  });

  return app;
};
