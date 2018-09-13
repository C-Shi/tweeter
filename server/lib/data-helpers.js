"use strict";

// Defines helper functions for saving and getting tweets, using the database `db`
module.exports = function makeDataHelpers(db) {

  return {

    // Saves a tweet to `db`
    saveTweet: function(newTweet, callback) {
      db.collection("tweets").insertOne(newTweet);
      callback(null, true);
    },

    // Get all tweets in `db`, sorted by newest first
    getTweets: function(callback) {
      const sortNewestFirst = (a, b) => a.created_at - b.created_at;
      db.collection('tweets').find().toArray((err, tweets) => {
        if (err) throw err;
        // convert search results' date into date from now
        callback(err, tweets.sort(sortNewestFirst));
      })
    },

    // update like status
    likeTweet: function(id, isLike, callback) {
      // id is the string generated as unique identifier
      // isLike is the status of liking
      db.collection("tweets").findAndModify({'id': id}, [['id', 'asc']] ,{ $set: {'liked': isLike} }, 
      function(err, tweet){
        return ;
      })
    }, // update tweet into database

    generatedRandomTweetsId : function(){
      const lib = 'qwertyuioplkjhgfdsazxcvbnmQWERTYUIOPLKJHGFDSAZXCVBNM1234567890';
      let id = '';
      for (let i = 0; i < 6; i++){
        const index = Math.floor(Math.random() * lib.length);
        id += lib[index];
      }
      return id;
    }
  }
}