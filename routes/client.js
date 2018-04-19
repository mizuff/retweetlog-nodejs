const Twitter = require('twitter');
require('dotenv').config();

const showUser = (screen_name) => {
    const params = {screen_name: screen_name};
    client.get('users/show', params, (error, profile, response) => {
        if(!error) {
            console.log(profile);
        } else {
            console.log(error);
        }
    });
}

const client = new Twitter({
    consumer_key: process.env.CONSUMER_KEY,
    consumer_secret: process.env.CONSUMER_SECRET,
    access_token_key: process.env.ACCESS_TOKEN_KEY,
    access_token_secret: process.env.ACCESS_TOKEN_SECRET
});

exports.index = (req, res) => {
    res.render('index', { items: [] });
};

exports.getRetweetedTweets = (req, res, next) => {
    if (req.body.screen_name) {
        // showUser(req.body.screen_name);
        const params = {screen_name: req.body.screen_name};
        client.get('statuses/user_timeline', params, (error, tweets, response) => {
            if (!error) {
                const retweetedTweets = tweets.filter(tweet => tweet['retweeted_status']);
                res.render('index', { items: retweetedTweets });
            } else {
                const errorMessage = [{ text: error.message || error[0]['message'] }];
                res.render('index', { items: errorMessage });
            }
        });
    }
};