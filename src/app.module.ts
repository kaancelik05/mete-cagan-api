import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import environment from 'tools/environment/environment';
import { MulterModule } from '@nestjs/platform-express';
import { ImagesModule } from './images/images.module';
import { LoginModule } from './login/login.module';
import { TokenMiddleware } from 'libs/middlewares/token.middleware';
import { ImagesAdminModule } from './images-admin/images-admin.module';

@Module({
  imports: [
    UserModule,
    ImagesModule,
    LoginModule,
    ImagesAdminModule,
    MongooseModule.forRoot(environment.mongoUrl),
    MulterModule.register({
      dest: '/uploads',
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(TokenMiddleware)
      .forRoutes({path: '*', method: RequestMethod.ALL});
  }
}
