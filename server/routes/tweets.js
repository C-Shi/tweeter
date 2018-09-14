

const express = require('express');
const userHelper = require('../lib/util/user-helper');
const moment = require('moment');


const tweetsRoutes = express.Router();

module.exports = function (DataHelpers) {
  tweetsRoutes.get('/', (req, res) => {
    DataHelpers.getTweets((err, tweets) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.json(tweets);
      }
    });
  });

  tweetsRoutes.post('/', (req, res) => {
    if (!req.body.text) {
      res.status(400).json({ error: 'invalid request: no data in POST body' });
      return;
    }

    if (req.body.repost) {
      DataHelpers.repostTweet(req.body.id, (err, oldTweet) => {
        const user = req.body.user ? req.body.user : userHelper.generateRandomUser();
        const tweet = {
          id: DataHelpers.generatedRandomTweetsId(),
          user,
          content: {
            text: req.body.text,
          },
          created_at: Date.now(),
          liked: false,
          likeCount: 0,
          repost: 0,
        };

        DataHelpers.saveTweet(tweet, (error) => {
          if (error) {
            res.status(500).json({ error: error.message });
          } else {
            // immediate send tweet back so front-end js can update DOM immediately
            tweet.created_at = moment(tweet.created_at).fromNow();
            oldTweet.created_at = moment(oldTweet.created_at).fromNow();
            const tweets = { tweet, oldTweet };
            res.status(201).send(tweets);
          }
        });
      });
    } else {
      const user = req.body.user ? req.body.user : userHelper.generateRandomUser();
      const tweet = {
        id: DataHelpers.generatedRandomTweetsId(),
        user,
        content: {
          text: req.body.text,
        },
        created_at: Date.now(),
        liked: false,
        likeCount: 0,
        repost: 0,
      };

      DataHelpers.saveTweet(tweet, (err) => {
        if (err) {
          res.status(500).json({ error: err.message });
        } else {
          // immediate send tweet back so front-end js can update DOM immediately
          tweet.created_at = moment(tweet.created_at).fromNow();
          const tweets = { tweet };
          res.status(201).send(tweets);
        }
      });
    }
  });

  tweetsRoutes.put('/:id', (req, res) => {
    const tweetId = req.params.id;
    DataHelpers.likeTweet(tweetId, req.body, (err, tweet) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.status(200).send(tweet);
      }
    });
  });

  return tweetsRoutes;
};
