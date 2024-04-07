import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// import * as graphqlUploadExpress from 'graphql-upload/GraphQLUploadExpress.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // max file size is 1 mb (to be discussed)
  // max files uploaded at ounce is 5 (to be discussed)
  /*app.use('/graphql',
          graphqlUploadExpress({maxFileSize:1000000, maxFiles: 5}),
  );*/
  await app.listen(3000);
}
bootstrap();
