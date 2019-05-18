#Greencity Project

The greencity project is a NestJS based platform for mapping realtime twitter data on google maps.

##Overview
The platform obtains data from twitter, parses the tweets and uses **google cloud language entity analysis** to get a list of locations.
The locations are then geocoded into longitude/latitude values using **google maps geocode api** and the values pushed and stored in mongo db.
Using mongodb **change streams** we get realtime updates on the database which are then used to update the markers on the map using **Pusher**

##Getting Started
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

##Prerequisites
You will need Node js and npm installed on your system.

To check for node and npm run node -v and npm -v
```bash
node -v
npm -v
```

##Installation

Clone or download the github repository onto your local machine.

Install the node modules
```bash
npm install 
```
The project uses google maps javascript api, generate an api key from google and place it in **views/index.ejs**

    <script type="text/javascript" src="https://maps.googleapis.com/maps/api/js?key=YOURAPIKEYcallback=initMap"async defer></script>

The project also relies on **Google Cloud Platform** APIs. 

Set up an account on GCP and activate the following API's and generate their respective keys
-**Google cloud natural language**
-**Google maps api**
-**Google geocoding api**
    https://cloud.google.com/natural-language/docs/quickstarts

Set up a pusher account and generate API keys.
    https://pusher.com/docs/channels/getting_started/javascript

Set up a Twiiter app and generate consumer keys and access tokens.
    https://developer.twitter.com/en/docs/basics/getting-started

Set up a mongodb instance on Mongo Atlas. Mongo Atlas configures replica sets automatically, thus enabling the use of change streams to monitor realtime updates to the db.
In case you a using a local installation of Mongo, set up replica sets on your local instance.
    https://docs.mongodb.com/manual/tutorial/getting-started/

Add the API keys to **src/config/env**
```typescript
// export keyvalue pairs
export const configuration = {
    API_KEY: 'TWITTER_APP_KEY',
    API_SECRET: 'TWITTER_APP_SECRET',
    ACCESS_TOKEN: 'TWITTER_ACCESS_TOKEN',
    ACCESS_SECRET: 'TWITTER_ACCESS_SECRET',
};

// Mongo uri
export const MongoConnect = {
    mongoUri: 'PATH-TO-MONGODB',
};

export const GoogleGeocode = {
    apiKey: 'GEOCODE_API_KEY',
};

export const PusherEnv = {
    appId: 'PUSHER_APP_ID',
    key: 'PUSHER_KEY',
    secret: 'PUSHER_SECRET',
    cluster: 'PUSHER_CLUSTER',
    encrypted: true
};
```

##Usage
To get the project up and started run:

```bash
npm start run
```
or

```bash
npm start run --dev
```
## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

##Built with
-NestJs

##Authors
-Inziano Joe

##Licence
[MIT](https://choosealicense.com/licenses/mit/)