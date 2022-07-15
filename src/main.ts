import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser'
import { ValidationPipe } from "@nestjs/common";
import { GlobalExceptionFilter } from "./filter/global-exception.filter";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableShutdownHooks()

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    disableErrorMessages: false,
    forbidNonWhitelisted: true,
    transform: true,
  }))
  app.useGlobalFilters(new GlobalExceptionFilter())
  app.use(cookieParser())

  await app.listen(3000);
}
bootstrap();
