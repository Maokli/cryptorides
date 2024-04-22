/* eslint-disable prettier/prettier */
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import * as dotenv from "dotenv";
async function bootstrap() {
  dotenv.config();
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'http://localhost:3000',
    credentials: true,
    allowedHeaders: 'Content-Type, Authorization', 
    methods: 'GET, POST, PUT, DELETE', 
  });

  await app.listen(3001);
}
bootstrap();

