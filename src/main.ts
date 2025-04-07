import { INestApplication, Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import helmet from 'helmet';
import { HttpExceptionFilter } from './common/exceptions/http-exceptions.filter';
import { ResponseInterceptor } from './common/interceptors/http-response.interceptor';
import { MainModule } from './main.module';

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

function configureSecurity(app: INestApplication) {
  app.use(helmet());
}

function configureCors(app: INestApplication) {
  app.enableCors({
    origin: process.env.CORS_ORIGIN || '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });
}

function configureGlobalSettings(app: INestApplication) {
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  app.useGlobalInterceptors(new ResponseInterceptor());
  app.useGlobalFilters(new HttpExceptionFilter());
  app.setGlobalPrefix('api/v1');
}

function handleProcessErrors(logger: Logger) {
  process.on('uncaughtException', (err) => {
    logger.error('Uncaught Exception:', err);
    process.exit(1);
  });

  process.on('unhandledRejection', (reason, promise) => {
    logger.error('Unhandled Rejection at:', promise, 'reason:', reason);
  });
}
