// this js file will be responsible for all styling related js
$(document).ready(function(){

  // toggle and auto focus when click button
  $('#nav-bar button').click(function(){
    $('section.new-tweet').slideToggle(function(){
      $(this).find('textarea').focus();
    });
  })

  // like action, which will change the fontawesome and also send an ajax request
  $('#all-tweets').on('click', 'i[data-id]', function(){
    const isLike = (!$(this).hasClass('fas')).toString();
    const likeCount = ($(this).next().text());
    const data = {isLike: isLike, likeCount: likeCount};
    $(this).toggleClass('fas far');
    $.ajax({
      url: "/tweets/" + $(this).data('id'),
      method: 'PUT', 
      data: data
    }).success(function(tweet) {
      $(this).next('span').text(tweet.value.likeCount); // ? why this does not change instantly
    });
  })
})