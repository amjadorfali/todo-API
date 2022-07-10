import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { INestApplication, Logger } from '@nestjs/common';
import { LogTimeTookInterceptor, TimeoutInterceptor } from './interceptors';

declare const module: any;
const port = process.env.PORT || 1000;

bootstrap();

async function bootstrap() {
  console.log(process.env.JWT_HASH_SECRET);
  //FIXME:  REMOVE SECRET
  if (!process.env.JWT_HASH_SECRET) throw Error('NO SECRET FOUND');
  const app = await setupApp();

  log();
  hotReload(app);
}

async function setupApp() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalInterceptors(new LogTimeTookInterceptor(), new TimeoutInterceptor());
  await app.listen(port);
  return app;
}

function log() {
  Logger.log(`🚀 Server running on PORT : ${port}`, 'Bootstrap');
  console.debug('🔥 Nest Server ready to roll 🔥 ');
}

function hotReload(app: INestApplication) {
  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => {
      app.close();
    });
  }
}
