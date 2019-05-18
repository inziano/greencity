import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Tweet } from './tweets/interface/tweet.interface';

@Injectable()
export class AppService {
  // Tweet var
  tweet: any;

  constructor( @InjectModel( 'Tweet' ) private readonly tweetModel: Model<Tweet>) {

  }

  // Query data from mongodb
  async getTweets( pusher ) {
    // Watch mongodb for changes
    /**
     * Get the specific tweet dets
     * return obj
     *
     */
    const stream = this.tweetModel.watch();

    const val = await stream.on('change', (data) => {

      const {fullDocument: { text }} = data;
      const { fullDocument: { geo }} = data;

      pusher( text, geo);
    });

  }

}
