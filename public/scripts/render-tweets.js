// when append text, always use .text() or DOM createTextNode() function to avoid XSS
function createHeader (tweetData) {
    // construct header
    const $avatar = $("<img />").attr("src", tweetData.user.avatars.small);
    const $h3 = $("<h3 />").text(tweetData.user.name);
    const $small = $("<small />").text(tweetData.user.handle);
    const $header = $("<header />").append($avatar, $h3, $small);

    return $header;
}

function createTweetBody (tweetData) {
    // construct div
    const $body = $("<div />").addClass('main-tweet').text(tweetData.content.text);
    
    return $body;
}

// construct footerc
function createFooter (tweetData) {
  const $flag = $("<i />").addClass("fas fa-flag");
  const $retweet = $("<i />").addClass("fas fa-retweet");

  const likeStatus = tweetData.liked ? "fas fa-heart" : "far fa-heart";
  const tweetId = tweetData.id;
  console.log(tweetData.id);
  const $like = $("<i />").addClass(likeStatus).attr('data-id', tweetId);

  const $divTime = $("<div />").addClass("tweet-time").text(new Date(tweetData.created_at).toLocaleString());
  const $divLike = $("<div />").addClass("likes").append($flag, $retweet, $like);
  const $footer = $("<footer />").append($divTime, $divLike);

  return $footer;
}

// put header body and footer together calling inside
function createTweetElement (tweetData) {
  const $header = createHeader(tweetData);
  const $body = createTweetBody(tweetData);
  const $footer = createFooter(tweetData);

  const $tweet = $("<article />").addClass('tweet').append($header, $body, $footer);
  return $tweet;
}

// construct header, body, footer of each tweets and render to the DOM
function renderTweets (tweetData){
  for (tweet of tweetData){
    const $tweet = createTweetElement(tweet);
    $("#all-tweets").prepend($tweet);
  }
}

// load all tweets via ajax call
function loadTweets(){
  $.ajax("/tweets", {
    method: 'GET',
    dataType: "JSON"
    // adding success callback when successfully receive data from database
  }).success(function(tweets){
    renderTweets(tweets);
    // adding a fallback in case something happens
  }).fail(function(){
    alert("Oh. Something happens")
  })
}