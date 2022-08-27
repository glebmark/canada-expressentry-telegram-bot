import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();

// TODO:
// plan architecture
// save in DB timestamp of last parsing
// save all URLs in DB
//
//
//
//