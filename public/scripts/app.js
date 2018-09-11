/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// calling renderTweets function which exists in render-tweets.js file
$(document).ready(function(){
  
  
  // ajax call
  const $form = $(".new-tweet form");
  $form.submit(function(event){
    // prevent default event on submitting
    event.preventDefault();
    // convert form data to query string
    const data = $(this).serialize();
    //
    $.ajax("/tweets/",{
      // in the object, specify the method and what data to send
      method: 'POST',
      data: data,
    }).done(function(){
      loadTweets(); // this is not good b/c we are re-rendering the entire database, will replace in the future
    })
  });

  loadTweets(); // on document ready, load all tweets from database

}) // end of document ready func


