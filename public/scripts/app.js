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

    /* form validation  
      1. grab the text area content
      2. send content to formValidator function 
      3. proceed with post if validated, otherwise return 
    */
    const post = $('.new-tweet form textarea[name=text]').val();
    
    // ajax call only happens when form is validated
    if (formValidator(post)){
      $.ajax("/tweets/",{
        // in the object, specify the method and what data to send
        method: 'POST',
        data: data,
      }).done(function(){
        loadTweets(); // this is not good b/c we are re-rendering the entire database, will replace in the future
      })
      // No Else If because invalided post requestd will be rejected and handled by formValidator function
    } // end if  
  });

  loadTweets(); // on document ready, load all tweets from database

  function formValidator(tweet){
    if (!tweet) {
      alert("Tweets cannot be blank");
      return false;
    } else if (tweet.length > 140) {
      alert("Tweets should be less than 140 character");
      return false;
    }
    return true;
  }

}) // end of document ready func


