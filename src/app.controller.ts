import { Controller, Get, Render } from '@nestjs/common';
import { TweetsService } from 'src/tweets/tweets.service';
import { AppService } from './app.service';
import { PusherEnv } from '../src/config/env';
import Pusher = require('pusher');

@Controller()
export class AppController {

  // Coordinates and text to be added on pin
  coords: any;
  text: string;
  push: any;

  constructor(private readonly appService: AppService, private readonly tweetService: TweetsService) {
    // Call app service
    this.appService.getTweets( this.pushData );
  }

  pushData( text, geo ) {
    // Initialize pusher
    const push = new Pusher( PusherEnv );
    push.trigger('greencity', 'trash-located', {
      geo,
      text,
    });
  }

  @Get()
  @Render('index')
  // Map coordinates
  root() {
    this.tweetService.retrieveTweets();
    return { coords: {lat: -1.28333, lng: 36.81667} };
  }
}
