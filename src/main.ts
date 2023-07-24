import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

const PORT_SERVER = 7777;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Victory-prize__API')
    .setDescription('API')
    .setVersion('1.0.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.enableCors({ origin: true });
  await app.listen(PORT_SERVER, () => {
    console.log('SERVER START');
    console.log(
      `[${new Date()}] MAIN SERVER => http://localhost:${PORT_SERVER}`,
    );
  });
}
bootstrap();
