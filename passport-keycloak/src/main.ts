import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
import * as passport from 'passport';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  console.log(process.env.DATABASE_HOST);
  app.setGlobalPrefix('api');
  app.enableCors({
    origin: ['http://localhost:3000'],
    credentials: true,
  });
  app.use(
    session({
      cookie: {
        maxAge: 86400000,
      },
      secret: 'dahdgasdjhsadgsajhdsagdhjd',
      resave: false,
      saveUninitialized: false,
      // store: new TypeormStore().connect(sessionRepo),
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session());
  await app.listen(3000);
}
bootstrap();
