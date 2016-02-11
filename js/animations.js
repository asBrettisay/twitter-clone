$(document).ready(function() {

  $('.tweet-compose').on('click', function() {
    $(this).height(100);
    $('#tweet-controls').css("display", "block");
  });
  $('.tweet-compose').keypress(function() {
    var chars = $('#char-count').text();
    $('#char-count').text(chars -= 1);
    if (chars <= 10) {
      $('#char-count').css('color', 'red');
    }
    if (chars < 0) {
      $('#char-count').text(0);
    }
  })
  if ($('.tweet-compose').val().length < 0) {
    $('.tweet-submit').prop("disabled", true);
    if ($('.tweet-compose').val().length > 0) {
      $('.tweet-sumbit').prop("disabled", false);
    }
  }

});
