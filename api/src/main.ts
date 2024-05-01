import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import * as dotenv from "dotenv";
import * as express from 'express';
import * as fs from 'fs';

async function bootstrap() {
  dotenv.config();

  const dir = './uploads';
  if (!fs.existsSync(dir)){
    fs.mkdirSync(dir);
  }

  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.use('/uploads', express.static('uploads'));
  
  await app.listen(3001);
}
bootstrap();