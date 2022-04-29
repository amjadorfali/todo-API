import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule, MongooseModuleOptions } from '@nestjs/mongoose';
import { join } from 'path';
import { ConfigModule, ConfigModuleOptions, ConfigService } from '@nestjs/config';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { APP_GUARD } from '@nestjs/core';

import { GqlJWTAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { LoggerMiddleware } from './middleware/logger';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TodoModule } from './todo/todo.module';
import { AuthModule } from './auth/auth.module';

const getMongoUrl = (configService: ConfigService) => {
  const urlStart = configService.get('MONGO_URL_START');
  const urlEnd = configService.get('MONGO_URL_END');
  const urlUserName = configService.get('MONGO_USER_NAME');
  const urlUserPassword = configService.get('MONGO_USER_PASSWORD');
  const urlClusterName = configService.get('NODE_ENV');

  return `${urlStart}${urlUserName}:${urlUserPassword}@${urlClusterName}${urlEnd}`;
};

const setUpDB = async (configService: ConfigService): Promise<MongooseModuleOptions> => {
  return {
    uri: getMongoUrl(configService),
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };
};

const envConfig: ConfigModuleOptions = {
  isGlobal: true,
  envFilePath: [
    `${process.cwd()}/.env`,
    process.env.NODE_ENV === 'production' ? `${process.cwd()}/.env.production` : `${process.cwd()}/.env.development`,
  ],
};

const graphqlConfig: ApolloDriverConfig = {
  autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
  playground: true,
  debug: true,
  sortSchema: true,
  driver: ApolloDriver,
  context: ({ req }) => ({ ...req }),
};
@Module({
  imports: [
    ConfigModule.forRoot(envConfig),
    GraphQLModule.forRoot<ApolloDriverConfig>(graphqlConfig),
    MongooseModule.forRootAsync({
      useFactory: setUpDB,
      inject: [ConfigService],
    }),
    UserModule,
    TodoModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,

    {
      provide: APP_GUARD,
      useClass: GqlJWTAuthGuard,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        LoggerMiddleware,
        //,Add any other middleWare here
      )
      .forRoutes('*');
  }
}
