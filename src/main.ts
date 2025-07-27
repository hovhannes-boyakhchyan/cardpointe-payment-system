import { ConfigService } from '@nestjs/config';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './common/filters/all-exceptions.filter';
import { ClassRequestAndResponseLogger } from './common/interceptors/global.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['log', 'error', 'warn', 'debug', 'verbose'],
  });
  const configs: ConfigService = app.get(ConfigService);

  app.useGlobalPipes(new ValidationPipe());
  const httpAdapterHost = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapterHost));
  app.useGlobalInterceptors(new ClassRequestAndResponseLogger());

  const port = configs.get<number>('PORT');
  const NODE_ENV = configs.get<string>('NODE_ENV');
  const logger = new Logger(' CARD_POINTE ');
  await app.listen(port, () => {
    logger.log(`Service is running on ===>>> http://...:${port}`);
    logger.log(`ENVIRONMENT ==>> ${NODE_ENV}`);
  });
}
bootstrap();
