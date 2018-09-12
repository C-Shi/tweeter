"use strict"

const { MongoClient } = require('mongodb');
const MONGODB_URI = 'mongodb://localhost:27017/tweeter';

MongoClient.connect(MONGODB_URI, (err, db) => {
  if(err){
    console.log(`Failed to connect: ${MONGODB_URI}`);
    throw err;
  }

  console.log(`Connect to mongodb ${MONGODB_URI}`);

  function getTweets(callback){
    db.collection('tweets').find().toArray(callback);
  };

  getTweets((err, results) => {
    if (err) throw err;
    results.forEach((result) => {
      console.log(result);
    })
  })

  db.close();
})