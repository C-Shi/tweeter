// this js file will be responsible for all styling related js
$(document).ready(() => {
  // toggle and auto focus when click button
  $('#nav-bar button').click(() => {
    $('section.new-tweet').slideToggle(function () {
      $(this).find('textarea').focus();
    });
  });

  // ajax call for likeing / upliking event ****************************************
  // like action, which will change the fontawesome and also send an ajax request
  $('#all-tweets').on('click', 'i[data-id]', function () {
    console.log($(this).data('id'));
    const isLike = (!$(this).hasClass('fas')).toString();
    const likeCount = ($(this).next().text());
    const data = { isLike, likeCount };
    $.ajax({
      url: `/tweets/${  $(this).data('id')}`,
      method: 'PUT',
      data,
    }).success((tweet) => {
      $(`.likes i[data-id=${tweet.value.id}]`).toggleClass('fas far');
      $(`.likes i[data-id=${tweet.value.id}]`).next('span').text(tweet.value.likeCount);
    });
  });

  // ajax call for posting tweets ************************
  const $form = $('.new-tweet form');
  $form.submit(function (event) {
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
    if (formValidator(post)) {
      $.ajax('/tweets/', {
        // in the object, specify the method and what data to send
        method: 'POST',
        data,
        // tweet is available because server side post request send the tweets info back
      }).done((tweet) => {
          // rednerTweets take an array, when passing [tweet] instead of tweet
          renderTweets([tweet.tweet]);
          // when successfully post, clear out textarea and hide the tweet area
          $(".new-tweet textarea").val("");
          $(".new-tweet").hide();
          $(".new-tweet span.counter").text('140');
        });
      // No Else If because invalided post requestd will be rejected and handled by formValidator function
    } // end if
  });

  // repost feature
  $('#all-tweets').on('click', 'i.fa-retweet', function () {
    const tweet = {
      id: $(this).nextAll('[data-id]').data('id'),
      text: $(this).closest('footer').prev().text(),
      repost: true,
    };

    $.ajax('/tweets',
      {
 method: 'POST',
        data: tweet 
}).done((tweet) => {
       // when received, find old tweet and update the repost number
       const oldTweetId = tweet.oldTweet.value.id;
       const $oldTweet = $(`#all-tweets .tweet i[data-id=${oldTweetId}]`);
       $oldTweet.prev().text(tweet.oldTweet.value.repost);
       renderTweets([tweet.tweet]);
     });
  }); // end of repost
});

// form validator function, passing actuall tweet info as string, return true if validate
function formValidator(tweet) {
  const $error = $('.new-tweet .error');
  const empty = 'Sorry! Tweets cannot be blank';
  const long = 'Sorry! Tweets should be less than 140 characters';
  if (!tweet) {
    // check if error message is showing, needs to hide first
    if ($error.css('display') !== 'none') {
      $($error).slideUp();
    }
    $error.text(empty).slideDown();
    return false;
  } if (tweet.length > 140) {
    if ($error.css('display') !== 'none') {
      $($error).slideUp();
    }
    $error.text(long).slideDown();
    return false;
  }
  $error.text('').hide();
  return true;
}
