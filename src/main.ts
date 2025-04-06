import { NestFactory } from '@nestjs/core';
import { ValidationPipe, Logger, INestApplication } from '@nestjs/common';
import { MainModule } from './main.module';
import compression from 'compression';
import helmet from 'helmet';
import { ResponseInterceptor } from './common/interceptors/http-response.interceptor';
import { HttpExceptionFilter } from './common/exceptions/http-exceptions.filter';

async function bootstrap() {
  const logger = new Logger('BlogPostAPI');
  const app = await NestFactory.create(MainModule, { logger });

  configureSecurity(app);
  configureCors(app);
  configureGlobalSettings(app);
  handleProcessErrors(logger);

  const PORT = process.env.PORT || 3000;
  const HOST = process.env.HOST || '0.0.0.0';

  await app.listen(PORT, HOST, () => {
    logger.log(`Application is running on: http://${HOST}:${PORT}`);
  });
}

bootstrap().catch((error) => {
  console.error('Error starting the application:', error);
  process.exit(1);
});

/**
 * Configures security-related middlewares like Helmet and Compression.
 * @param app - The NestJS application instance.
 */
function configureSecurity(app: INestApplication) {
  app.use(helmet());
  app.use(compression());
}

/**
 * Configures CORS settings for the application.
 * @param app - The NestJS application instance.
 */
function configureCors(app: INestApplication) {
  app.enableCors({
    origin: process.env.CORS_ORIGIN || '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });
}

/**
 * Configures global settings like interceptors, filters, and pipes.
 * @param app - The NestJS application instance.
 */
function configureGlobalSettings(app: INestApplication) {
  app.useGlobalInterceptors(new ResponseInterceptor());
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  app.setGlobalPrefix('api/v1');
}

/**
 * Handles uncaught exceptions and unhandled promise rejections.
 * @param logger - The logger instance.
 */
function handleProcessErrors(logger: Logger) {
  process.on('uncaughtException', (err) => {
    logger.error('Uncaught Exception:', err);
    process.exit(1);
  });

  process.on('unhandledRejection', (reason, promise) => {
    logger.error('Unhandled Rejection at:', promise, 'reason:', reason);
  });
}
