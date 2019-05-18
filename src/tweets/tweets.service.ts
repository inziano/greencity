import { Injectable } from '@nestjs/common';
import { Tweet } from './interface/tweet.interface';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { configuration, GoogleGeocode } from '../config/env';
import Twit = require('twit');
import Gmaps = require('@google/maps');
import Language = require('@google-cloud/language');

@Injectable()
export class TweetsService {

    twt: Twit;
    googleLang: Language;
    geoMaps: any;

    constructor(@InjectModel('Tweet') private readonly tweetModel: Model<Tweet> ) {
        // Twitter
        const T = new Twit({
            consumer_key: configuration.API_KEY,
            consumer_secret: configuration.API_SECRET,
            access_token: configuration.ACCESS_TOKEN,
            access_token_secret: configuration.ACCESS_SECRET,
            timeout_ms: 60 * 1000,  // optional HTTP request timeout to apply to all requests.
            strictSSL: true,
        });

        // Google maps
        this.geoMaps = new Gmaps.createClient({
            key: GoogleGeocode.apiKey,
            Promise: Promise,
        });

        // Google language
        this.googleLang = new Language.LanguageServiceClient();

        // Twit variable
        this.twt = T;
    }

    async retrieveTweets() {
        // Fetch tweets from twitter using streaming api
        const tweets = this.twt.stream('statuses/filter', { track: 'traffic' });

        return await tweets.on('tweet', (tweet) => {
            // New tweet object with tweet text and location data
            const tweetDets = (({ text, geo }) => ({ text, geo }))(tweet);

            // Pass text
            this.classifyContent( tweetDets );

        });
    }

    async classifyContent( tweetDets ) {

        const tweetTxt = tweetDets.text;

        // Build the object
        const tweetObj = {
            content: tweetTxt,
            type: 'PLAIN_TEXT',
        };

        // Classify text
        try {
           const [ res ] = await this.googleLang.analyzeEntities( { document: tweetObj });

           const ent = res.entities;

           /**
            *  Filter the array and get all the entities of type LOCATION
            * Map the new array to the names of the locations
            * Join the locations into a string
            */
           var location = ent.filter( entity => entity.type === 'LOCATION' || entity.type === 'ADDRESS').map( entity => entity.name ).join(',');

        } catch (error) {
            // Handle error silently
            return error;
        }

        /**
         * Push location to google maps and geocode
         * Receive response, get the lon/lat values
         */
        try {
            // values
            var vals = await this.geocodeLocale( location );
        } catch (error) {
            return error ;
        }

        const coords = vals.json.results[0].geometry.location || null;

        // Build tweet
        tweetDets.geo = coords;
        tweetDets.locations = JSON.stringify(location);

        this.saveTweet( tweetDets );

    }

    // Geocode location
    geocodeLocale( location: string ) {

        return this.geoMaps.geocode({ address: location }).asPromise();
    }

    // save data to mongodb
    saveTweet( twt: Tweet ) {
        // // Post data to mongoDB
        const newTweet = new this.tweetModel( twt );
        // // return
        newTweet.save(( error, resp ) =>{
            const ans = !error ? resp : error;
            return ans;
        });
    }
}
