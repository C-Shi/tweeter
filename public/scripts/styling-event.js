// this js file will be responsible for all styling related js
$(document).ready(function(){

  // toggle and auto focus when click button
  $('#nav-bar button').click(function(){
    $('section.new-tweet').slideToggle(function(){
      $(this).find('textarea').focus();
    });
  })


})