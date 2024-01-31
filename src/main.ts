import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
// import * as dotenv from 'dotenv';
import 'dotenv/config';

import { ConfigService } from '@nestjs/config';
import { EmojiLogger } from './emoji.logger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: new EmojiLogger(),
  });

  const port = 5000;
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({
    origin: ['http://localhost:3000'],
    credentials: true,
  });
  const config = app.get(ConfigService);
  await app.listen(port, () => {
    return config.get('general.port');
  });
}
bootstrap();
