import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TweetsController } from './tweets.controller';
import { TweetsService } from './tweets.service';
import { TweetsSchema } from './schemas/tweets.schema';

@Module({
    imports: [MongooseModule.forFeature([{ name: 'Tweet', schema: TweetsSchema }])],
    controllers: [ TweetsController ],
    providers: [ TweetsService ],
})
export class TweetsModule {}
