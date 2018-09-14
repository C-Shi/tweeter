/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// calling renderTweets function which exists in render-tweets.js file
$(document).ready(function() {
  loadTweets(); 
  // on document ready, load all tweets from database

}) // end of document ready func
