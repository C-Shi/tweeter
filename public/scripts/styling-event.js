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
    const data = {isLike: isLike};
    $(this).toggleClass('fas far');
    $.ajax({
      url: "/tweets/" + $(this).data('id'),
      method: 'PUT', 
      data: data
    });
  })
})