$(document).ready(function() {
  $('.tweet-actions').hide();
  $('.stats').hide();
  $('.reply').hide();
  var tweetLength = $('.tweet-compose').val().length;
  var charCount = $('#char-count');
  var actionFavorite = $('.tweet-actions > ul :nth-child(3)');

  function newTweet(tweet) {
    $('#stream').prepend(function() {
      return '<div class="tweet"><div class="content"><img class="avatar" src="img/alagoon.jpg" /><strong class="fullname">Billy Tweet</strong> <span class="username">@billytweet</span><p class="tweet-text">' + tweet + '</p>';
    });
  }

  $('.tweet').on('click', function() {
    $('.stats').hide();
    $('.reply').hide();
    $(this).find('.stats').show();
    $(this).find('.reply').show();
  })

  $('.content').mouseenter(function() {
    $(this).find('.tweet-actions').show();
  })

  $('.content').mouseleave(function() {
    $('.tweet-actions').hide();
  })

  $('.tweet-compose').on('click', function() {
    $(this).height(100);
    $('#tweet-controls').css("display", "block");
  });
  $('.tweet-compose').keydown(function() {
    tweetLength = $('.tweet-compose').val().length;
    charCount.text(140 - tweetLength);
    if (tweetLength >= 130) {
      charCount.css('color', 'red');
    }
    if (tweetLength > 140) {
      charCount.text(0);
    }
  })
  $('#tweet-submit').on('click', function() {
    var tweet = $('.tweet-compose').val();
    if (tweet.length > 140) {
      var count = charCount;
      charCount.css('color', 'red')
      charCount.text("Character count exceeded")
      return;
    }
    $('.tweet-compose').val('Compose new tweet...');
    $('.tweet-compose').height(25);
    $('#tweet-controls').css("display", "none");
    newTweet(tweet);
  });

  actionFavorite.on('click', function() {
    // var dad = $(this).parent('content');
    // var target = $(this).parent('.content').find('.num-favorites');
    var target = $('.num-favorites');
    var favorites = $(target).text();
    $(target).text(favorites += 1);

  })




});
