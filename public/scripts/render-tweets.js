const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": {
        "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
        "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
        "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
      },
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": {
        "small":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
        "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
        "large":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
      },
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  },
  {
    "user": {
      "name": "Johann von Goethe",
      "avatars": {
        "small":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
        "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
        "large":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
      },
      "handle": "@johann49"
    },
    "content": {
      "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
    },
    "created_at": 1461113796368
  }
];

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

// construct footer
function createFooter (tweetData) {
  const $flag = $("<i />").addClass("fas fa-flag");
  const $retweet = $("<i />").addClass("fas fa-retweet");
  const $like = $("<i />").addClass("far fa-heart");
  const $divTime = $("<div />").addClass("tweet-time").text(tweetData.created_at);
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

function renderTweets (tweetData){
  for (tweet of tweetData){
    const $tweet = createTweetElement(tweet);
    $("#all-tweets").prepend($tweet);
  }
}