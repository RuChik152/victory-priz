import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const PORT_SERVER = 7777;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({ origin: true });
  await app.listen(PORT_SERVER, () => {
    console.log('SERVER START');
    console.log(
      `[${new Date()}] MAIN SERVER => http://localhost:${PORT_SERVER}`,
    );
  });
}
bootstrap();
