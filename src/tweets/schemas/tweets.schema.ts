import * as mongoose from 'mongoose';

export const TweetsSchema = new mongoose.Schema({
    text: String,
    geo: Object,
    locations: String,
});
