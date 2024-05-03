import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { connectDatabase} from './config/database';
import UserModel from './model/user.model';
async function bootstrap() {


  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: '*', 
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type,Authorization', 
    credentials: true,
  });
  
  await app.listen(5000);
  await connectDatabase();
  await UserModel;

}
bootstrap();
