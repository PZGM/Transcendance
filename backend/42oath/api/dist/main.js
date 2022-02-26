"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const dotenv = require("dotenv");
const session = require("express-session");
const passport = require("passport");
const typeorm_1 = require("typeorm");
const session_1 = require("./typeorm/entities/session");
const connect_typeorm_1 = require("connect-typeorm");
const swagger_1 = require("@nestjs/swagger");
async function bootstrap() {
    dotenv.config();
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const sessionRepo = (0, typeorm_1.getRepository)(session_1.TypeORMSession);
    app.setGlobalPrefix('api');
    app.use(session({
        cookie: {
            maxAge: 86400000,
        },
        secret: 'j7lSA4XYLLNBgGedfaDa',
        resave: false,
        saveUninitialized: false,
        store: new connect_typeorm_1.TypeormStore().connect(sessionRepo)
    }));
    app.use(passport.initialize());
    app.use(passport.session());
    const config = new swagger_1.DocumentBuilder().setTitle('Transcendance API').setDescription('http://ssh.billyboy.fr:3000/').setVersion('0.01').build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('/documentation', app, document);
    await app.listen(3000);
}
bootstrap();
//# sourceMappingURL=main.js.map