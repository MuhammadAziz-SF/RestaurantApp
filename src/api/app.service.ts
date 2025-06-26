import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

export default class Application {
  public static async main(): Promise<void> {
    const PORT = Number(process.env.PORT);
    let app = await NestFactory.create(AppModule);
    app.enableCors({
      origin: '*',
    });

    const api = 'api/v1';
    app.setGlobalPrefix(api);
    const config_swagger = new DocumentBuilder()
      .setTitle('Restaurant App')
      .setVersion('1.0')
      .addBearerAuth({
        type: 'http',
        scheme: 'Bearer',
        in: 'Header',
      })
      .build();
    const documentFactory = () =>
      SwaggerModule.createDocument(app, config_swagger);
    SwaggerModule.setup(api, app, documentFactory);

    await app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));
  }
}
