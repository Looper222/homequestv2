import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CreateUserMiddleware } from './users/middleware/create-user.middleware';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb+srv://admin-user-hq:SR6UK9UzZ8LVTRVH@nodetuts.je9tx.mongodb.net/homequestv2?retryWrites=true&w=majority'), UsersModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
      consumer
        .apply(CreateUserMiddleware)
        .forRoutes({ path: 'users', method: RequestMethod.POST });
  }
}
