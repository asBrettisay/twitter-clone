$(document).ready(function() {
  $('[data-toggle="tooltip"]').tooltip();
  $('.tweet-actions').hide();
  $('.stats').hide();
  $('.reply').hide();
  $("time.timeago").timeago();
  $('.avatar').tooltip({title: function() {
    return $(this).parents('.content').find('.fullname').text();
  }});

  var initializing = true;
  var mainTweetBody = $('#dashboard > .tweet-compose');
  var tweetLength = $('.tweet-compose').val().length;
  var charCount = $('#char-count');
  var actionFavorite = $('.tweet-actions > ul :nth-child(3)');
  var actionRetweet = $('.tweet-actions > ul :nth-child(2)');
  var userFullName = $('#profile-summary > p').text();
  var userName = '@billytweet';
  $.actionFavorite = $('.tweet-actions > ul :nth-child(3)');
  $.actionRetweet = $('.tweet-actions > ul :nth-child(2)');
  $.reTweet;

  // If local storage exists, retrieve it.
  var localDataInitialize = function() {
    if (localStorage['twitterCloneData']) {
      return JSON.parse(localStorage['twitterCloneData'])
    } else {
      return [];
    }
  };
  var localData = localDataInitialize();


  var populateFeed = function() {
    localData.forEach(function(tweet) {
      newTweet(tweet.tweet, tweet.tweetId);
    })
    initializing = false;
  }
  populateFeed();

  function updateLocalStorage() {
    localStorage.setItem('twitterCloneData', JSON.stringify(localData));
  }
  // Generate unique ids for tweets.
  function generateId() {
    var rand = Math.floor(Math.random() * 26) + Date.now();
    return rand++;
  };


  function newTweet(tweet, tweetId) {
    // tweet = tweet text(string).
    // tweetId = A unique ID that must be generated before this function is invoked.
    if ($.reTweet) {
      var num = Number($.reTweet.target.text());
      $.reTweet.target.text(num += 1);
      $.reTweet = null;
      localData.forEach(function(tweet) {
        if (tweet.tweetId === $.reTweet.id) {
          tweet.retweets++;
        }
      })
      localStorage.setItem('twitterCloneData', JSON.stringify(localData));
    } else if (!initializing) {
      localData.push({
        tweetId: tweetId,
        author: '@billytweet',
        tweet: tweet,
        favorites: 0,
        retweets: 0
      });
      localStorage.setItem('twitterCloneData', JSON.stringify(localData));
    }

    $('#stream').prepend(function() {
      return '<div class="tweet" id=' + String(localData[localData.length-1].tweetId) + '> <div class="content"> <img class="avatar" src="img/alagoon.jpg" /> <strong class="fullname">Billy Tweet</strong> <span class="username">@billytweet</span> <p class="tweet-text">' + tweet + '</p> <div class="tweet-actions"> <ul> <li><span class="icon action-reply"></span> Reply</li> <li><span class="icon action-retweet"></span> Retweet</li> <li><span class="icon action-favorite"></span> Favorite</li> <li><span class="icon action-more"></span> More</li> </ul> </div> <div class="stats"> <div class="retweets"> <p class="num-retweets">0</p> <p>RETWEETS</p> </div> <div class="favorites"> <p class="num-favorites">0</p> <p>FAVORITES</p> </div> <div class="users-interact"> <div> <img src="img/alagoon.jpg" /> </div> </div> <div class="time">' +  $.timeago(new Date()); + ' </div> </div> <div class="reply"> <img class="avatar" src="img/alagoon.jpg" /> <textarea class="tweet-compose" placeholder="Reply to @billytweet"/></textarea> </div> </div> </div>';
    });
  }

  $('.tweet').on('click', function() {
    $('.stats').hide();
    $('.reply').hide();
    $(this).find('.stats').show();
    $(this).find('.reply').show();
  });

  // $('.content').mouseenter(function() {
  //   $(this).find('.tweet-actions').show();
  // });
  //
  // $('.content').mouseleave(function() {
  //   $('.tweet-actions').hide();
  // })

  $('body').on({
    mouseenter: function() {
      $(this).find('.tweet-actions').show();
    },
    mouseleave: function() {
      $('.tweet-actions').hide();
    }
  }, '.content');

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
  //Favorite action.
  $('#stream').on('click', '.tweet-actions > ul :nth-child(3)', function() {
    var target = $(this).parents('.content').find('.num-favorites');
    var favorites = Number($(target).text());
    var tweetId = $(this).parents('.tweet').attr('id');

    localData.forEach(function(tweet) {
      if (tweet.tweetId === tweetId) {
        tweet.favorites++;
        updateLocalStorage();
      }
    })
    $(target).text(favorites += 1);
  })


  // Retweet action.
  $('#stream').on('click', '.tweet-actions > ul :nth-child(2)', function () {
    var target = $(this).parents('.content').find('.num-retweets');
    var tweetId = $(this).parents('.tweet').attr('id');
    var targetTweet = $(this).parents('.content').find('.tweet-text').text();
    var targetUserName = $(this).parents('.content').find('.username').text();

    $('#mainTweetBody').val('RT ' + targetUserName + ": " + targetTweet);
    $.reTweet = {reTweet: true, target: target, id: tweetId }
  })





});
