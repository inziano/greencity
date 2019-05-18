import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TweetsModule } from './tweets/tweets.module';
import { MongoConnect } from './config/env';
import { TweetsService } from './tweets/tweets.service';

@Module({
  imports: [
    TweetsModule,
    MongooseModule.forRoot( MongoConnect.mongoUri ),
  ],
  controllers: [AppController],
  providers: [AppService, TweetsService],
})
export class AppModule {}
