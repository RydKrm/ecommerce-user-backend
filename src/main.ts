import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { ValidationExceptionFilter } from './filters/validation-exception.filter';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      // eleminate the unwanted parameter which is not in validator
      whitelist:true
    })
  )

  // added global filter
  app.useGlobalFilters(new ValidationExceptionFilter())

  await app.listen(6543);
}
bootstrap();