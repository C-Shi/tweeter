// this js file will be responsible for all styling related js
$(document).ready(function(){

  // toggle and auto focus when click button
  $('#nav-bar button').click(function(){
    $('section.new-tweet').slideToggle(function(){
      $(this).find('textarea').focus();
    });
  });

  // ajax call for likeing / upliking event ****************************************
  // like action, which will change the fontawesome and also send an ajax request
  $('#all-tweets').on('click', 'i[data-id]', function(){
    const isLike = (!$(this).hasClass('fas')).toString();
    const likeCount = ($(this).next().text());
    const data = {isLike: isLike, likeCount: likeCount};
    $.ajax({
      url: "/tweets/" + $(this).data('id'),
      method: 'PUT', 
      data: data
    }).success(function(tweet) {
      $('.likes i[data-id]').toggleClass('fas far');
      $('.likes span').text(tweet.value.likeCount); 
    });
  });

    // ajax call for posting tweets ************************
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
          // tweet is available because server side post request send the tweets info back
        }).done(function(tweet){
          // rednerTweets take an array, when passing [tweet] instead of tweet
          renderTweets([tweet]);
          // when successfully post, clear out textarea and hide the tweet area
          $(".new-tweet textarea").val("");
          $(".new-tweet").hide();
          $(".new-tweet span.counter").text('140');
        })
        // No Else If because invalided post requestd will be rejected and handled by formValidator function
      } // end if  
    });
})

 // form validator function, passing actuall tweet info as string, return true if validate
 function formValidator(tweet){
  const $error = $(".new-tweet .error")
  const empty = "Sorry! Tweets cannot be blank";
  const long = "Sorry! Tweets should be less than 140 characters"
  if (!tweet) {
    // check if error message is showing, needs to hide first
    if ($error.css('display') !== 'none'){
      $($error).slideUp();
    }
    $error.text(empty).slideDown();
    return false;
  } else if (tweet.length > 140) {
    if ($error.css('display') !== 'none'){
      $($error).slideUp();
    }
    $error.text(long).slideDown();
    return false;
  }
  $error.text("").hide();
  return true;
}
