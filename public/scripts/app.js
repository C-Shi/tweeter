/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// calling renderTweets function which exists in render-tweets.js file
$(document).ready(function(){
  renderTweets(data);
  
  // ajax call
  const $form = $(".new-tweet form");
  $form.submit(function(event){
    // prevent default event on submitting
    event.preventDefault();
    const data = $(this).serialize();
    //
    $.ajax("/tweets/",{
      // in the object, specify the method and what data to send
      method: 'POST',
      data: data,
    }).done(function(tweet){
      console.log(tweet);
    })
  })

}) // end of document ready func


