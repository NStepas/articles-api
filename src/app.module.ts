import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { ArticleModule } from './modules/articles/articles.module';
import { UserModule } from './modules/user/user.module';
import authConfig from './core/config/auth.config';
import { AuthModule } from './core/auth/auth.module';
import { appConfig } from './core/config/app.config';

@Module({
  imports: [
    AuthModule,
    UserModule,
    ArticleModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [authConfig, appConfig],
    }),
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get('app.database.database_uri'),
      }),
    }),
  ],
})
export class AppModule {}
