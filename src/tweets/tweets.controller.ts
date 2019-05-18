import { Controller, Get } from '@nestjs/common';
import { TweetsService } from './tweets.service';

@Controller('tweets')
export class TweetsController {

    // Constructor
    constructor( private readonly tweetService: TweetsService ) {}

    @Get()
    findAll() {
       this.tweetService.retrieveTweets();
    }
}
