jQuery(document).ready(function ($) {

  let timer, audio;
  let play = false;
  let total = 0,
    widthTotal = 0;
  let futureTime = 0;
  let ears = 8;
  let widthInterval;

  let today, year, month, day, hour, min, sec;

  function clearTimer() {
    $('#hours').val('00');
    $('#minutes').val('00');
    $('#seconds').val('00');
    clearInterval(timer);
    play = false;
    total = 0;
  }

  function changeIcons() {
    $('.colon.dots-seconds').toggleClass('active');
    $('.button-play > i').toggleClass('fa-play fa-pause');
  }

  function createAudio() {
    audio = $('<div class="d-none"><audio id="music" loop preload="auto"><source src="images/Imba.mp3" type="audio/mp3" /></audio></div>').appendTo('body');
    $('#music')[0].play();
    $('#music')[0].volume = ears / 10;
  }

  function removeAudio() {
    audio.remove();
  }

  function getTime() {
    today = new Date();
    day = today.getDate();
    day < 10 ? day = '0' + day : null;
    month = today.getMonth() + 1;
    month < 10 ? month = '0' + month : null;
    year = today.getFullYear();
    hour = today.getHours();
    min = today.getMinutes();
    min < 10 ? min = '0' + min : null;
    sec = today.getSeconds();
    sec < 10 ? sec = '0' + sec : null;
    $('.now-time').html(day + '.' + month + '.' + year + ' &nbsp; ' + hour + ':' + min + ':' + sec);
  }

  $('.inputs > input').on('focus', function () {
    $(this).select();
  }).on('keydown', function (e) {
    return (e.key >= '0' && e.key <= '9' || e.key === 'Backspace' || e.key === 'ArrowLeft' || e.key === 'ArrowRight');
  });

  $('.set-time').on('click', function () {
    let time = $(this).attr('time');
    total = time;
    $('#hours').val(parseInt(total / 3600));
    $('#minutes').val(parseInt(((total / 3600) - parseInt((total / 3600))) * 60));
    $('#seconds').val(parseInt(Math.round((((((total / 3600) - parseInt((total / 3600))) * 60) - parseInt((((total / 3600) - parseInt((total / 3600))) * 60))) * 60))));
  });

  $('.button-play').on('click', function () {
    let hours = $('#hours').val() * 3600;
    let minutes = $('#minutes').val() * 60;
    let seconds = $('#seconds').val();

    total = parseInt(+hours + +minutes + +seconds);
    widthTotal = total;

    clearInterval(widthInterval);
    getTime();

    if (total <= 0) {
      alert('Введите пожалуйста время!');
    } else {
      play = !play;

      $('.colon.dots-seconds').toggleClass('active');
      $('.button-play > i').toggleClass('fa-play fa-pause');

      let futureHour = hour * 3600;
      let futureMin = min * 60;
      let futureSec = sec;
      futureTime = parseInt(+futureHour + +futureMin + +futureSec + +total);

      let h = parseInt(futureTime / 3600);
      let m = parseInt(((futureTime / 3600) - parseInt((futureTime / 3600))) * 60);
      m < 10 ? m = '0' + m : null;
      let s = parseInt(Math.round((((((futureTime / 3600) - parseInt((futureTime / 3600))) * 60) - parseInt((((futureTime / 3600) - parseInt((futureTime / 3600))) * 60))) * 60)));
      s < 10 ? s = '0' + s : null;
      let hPrint = h;

      h >= 24 ? h -= 24 * Math.floor(h / 24) : null;
      h < 10 ? h = '0' + h : null;

      $('.future-time').html(h + ':' + m + ':' + s + ' &nbsp; ' + (day + Math.floor(hPrint / 24)) + '.' + month + '.' + year);

      console.log(futureTime);

      let width = 0;
      widthInterval = setInterval(function () {
        width += 100 / widthTotal;
        $('.line-time__b.way').css('width', width + '%');
        console.log(width);
      }, 1000);

      if (play === true) {
        timer = setInterval(function () {
          total -= 1;
          console.log(parseInt((((((total / 3600) - parseInt((total / 3600))) * 60) - parseInt((((total / 3600) - parseInt((total / 3600))) * 60))) * 60)));
          $('#hours').val(parseInt(total / 3600));
          $('#minutes').val(parseInt(((total / 3600) - parseInt((total / 3600))) * 60));
          $('#seconds').val(parseInt(Math.round((((((total / 3600) - parseInt((total / 3600))) * 60) - parseInt((((total / 3600) - parseInt((total / 3600))) * 60))) * 60))));
          if (total === 0) {
            clearTimer();
            changeIcons();
            createAudio();
            clearInterval(widthInterval);
            $('#stop').toggleClass('d-block');
          }
        }, 1000);
      } else {
        clearInterval(timer);
        clearInterval(widthInterval);
      }

      $('.button-redo').on('click', function () {
        clearInterval(widthInterval);
        $('.line-time__b.way').css('width', 0 + '%');
        if (total <= 0) {
          clearTimer();
        } else if (play) {
          clearTimer();
          changeIcons();
        } else {
          clearTimer();
        }
      });

      $('#stop').on('click', function () {
        removeAudio();
        $('#stop').removeClass('d-block').addClass('d-none');
      });

      console.log(hours + ' ' + minutes + ' ' + seconds + ' ' + play + ' ' + total);
    }
  });

  $('.button-settings').on('click', function () {
    $(this).toggleClass('active');
    $('.settings').toggleClass('d-block d-none');
  });

  $('#volume').on('input', function () {
    ears = $(this).val();
    console.log(ears);
  });

  $(window).on('load', function () {
    getTime();
  });

});