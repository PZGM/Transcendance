import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import * as session from 'express-session'
import * as passport from 'passport'
import { getRepository } from 'typeorm';
import { TypeORMSession } from './typeorm/entities/session';
import { TypeormStore } from 'connect-typeorm'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  dotenv.config();
  const app = await NestFactory.create(AppModule);
  const sessionRepo = getRepository(TypeORMSession); 
  app.setGlobalPrefix('api');
  app.use(
    session({
      cookie: {
        maxAge: 86400000,
        
      },
      secret: 'j7lSA4XYLLNBgGedfaDa',
      resave: false,
      saveUninitialized: false,
      store: new TypeormStore().connect(sessionRepo)
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session());

    //swagger
    const config = new DocumentBuilder().setTitle('Transcendance API').setDescription('http://ssh.billyboy.fr:3000/').setVersion('0.01').build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('/documentation', app, document);

    //CORS security
    app.enableCors({
      credentials: true,
      origin: true,
    });

  await app.listen(3000);
}
bootstrap();
