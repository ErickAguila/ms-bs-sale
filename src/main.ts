import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Habilitar las validaciones globalmente
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Elimina propiedades no declaradas en el DTO
      forbidNonWhitelisted: true, // Lanza una excepción si se envían propiedades no permitidas
      transform: true, // Transforma la data al tipo definido en los DTOs
    }),
  );

  //Configuración de Swagger
  const config = new DocumentBuilder()
    .setTitle('ms-bs-sale')
    .setDescription(
      'Microservicio para la gestión de productos y carrito de compra',
    )
    .setVersion('1.0')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('doc', app, documentFactory);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
