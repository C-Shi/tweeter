"use strict";

const userHelper    = require("../lib/util/user-helper")


const express       = require('express');
const tweetsRoutes  = express.Router();

module.exports = function(DataHelpers) {

  tweetsRoutes.get("/", function(req, res) {
    DataHelpers.getTweets((err, tweets) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.json(tweets);
      }
    });
  });

  tweetsRoutes.post("/", function(req, res) {
    if (!req.body.text) {
      res.status(400).json({ error: 'invalid request: no data in POST body'});
      return;
    }

    const user = req.body.user ? req.body.user : userHelper.generateRandomUser();
    const tweet = {
      id: DataHelpers.generatedRandomTweetsId(),
      user: user,
      content: {
        text: req.body.text
      },
      created_at: Date.now(),
      liked: false,
      likeCount: 0
    };

    DataHelpers.saveTweet(tweet, (err) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        // immediate send tweet back so front-end js can update DOM immediately
        res.status(201).send(tweet);
      }
    });
  });

  tweetsRoutes.put("/:id", function(req, res) {
    const tweetId = req.params.id;
    DataHelpers.likeTweet(tweetId, req.body, (err, tweet) => {
      if (err){
        res.status(500).json({error: err.message});
      }else {
        console.log
        res.status(200).send(tweet);
      }
    })
  })

  return tweetsRoutes;

}
