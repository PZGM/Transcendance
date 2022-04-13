import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import * as session from 'express-session';
import * as passport from 'passport';
import { getRepository } from 'typeorm';
import { TypeORMSession } from './typeorm/entities/session';
import { TypeormStore } from 'connect-typeorm';
import * as fs from 'fs';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as http from 'http';
import * as https from 'https';
import * as express from 'express';
import { ValidationPipe } from '@nestjs/common';
import { ChannelsService } from './chat/channel/channels.service';
import { Mute } from 'src/typeorm/entities/mutedUser';
import { User } from 'src/typeorm/entities/user';
import { Chat } from 'src/typeorm/entities/chat';
import { ChannelDto } from './dto/chat.dto';
import { Channel } from './typeorm';

async function bootstrap() {
  dotenv.config();

  //https
  const httpsOptions = {
    key: fs.readFileSync('./secrets/key.pem'),
    cert: fs.readFileSync('./secrets/certificate.pem'),
  };

  const server = express();
  const app = await NestFactory.create(
    AppModule,
    new ExpressAdapter(server),
  );


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
      store: new TypeormStore().connect(sessionRepo),      
    }),
  );
  //validation pipe
  app.useGlobalPipes(new ValidationPipe());

  //passport
  app.use(passport.initialize());
  app.use(passport.session());

    //swagger
    const config = new DocumentBuilder().setTitle('Transcendance API').setVersion('0.9.13').build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('/documentation', app, document);

    //CORS security
    app.enableCors({
      credentials: true,
      origin: true,
    });

    await app.init();

    //universal Channel

    let chanServ: ChannelsService;
    let channel: Channel;
    channel.owner = null; channel.admin = []; channel.name = "Universal Channel"; channel.visibility = "public";
    channel.users = []; channel.mute = []; channel.chats = []; channel.id = 0;
    chanServ.create(new ChannelDto(channel));

    http.createServer(server).listen(3001);
    https.createServer(httpsOptions, server).listen(3333);
}
bootstrap();
