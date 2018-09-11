$(document).ready(function(){
  /* For every possible change we want to grab the length of text
    1. change and blur will not fire immediately when text change
    2. keyup will not fire if client copy & paste using right click ---> However, the best way so far
    3. keypress will not fire when press delete, and also one char behind
    4. keydown will fire before text enter, so always 1 char behind
    5. another possible solution is to use HTML5 input event  --> But not supported in Opera Mini
  */
  $('.new-tweet form textarea').on('keyup', function(){
    const left = 140 - $(this).val().length;
    $('.new-tweet .counter').text(left);
  })
  //  when complete, add a fallback function in case user copy tweets using mouse
})