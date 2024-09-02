import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export function setupSwagger(app: any) {
  const options = new DocumentBuilder()
    .setTitle('NESTJS-CBAC-EXAMPLE')
    .setDescription(
      'A demo application that test Nestjs Claim-Based Authonrization Control',
    )
    .setVersion('1.0')
    .addTag('api')
    .addBearerAuth({
      type: 'http',
      scheme: 'Bearer',
      bearerFormat: 'JWT',
    })
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('nestjs-cbac-api', app, document, {
    swaggerOptions: { persistAuthorization: true },
  });
}
