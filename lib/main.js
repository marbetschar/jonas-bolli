'use strict';

var init = {
  navbarBurgers: function navbarBurgers() {
    var navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('a.navbar-burger'), 0);

    if (navbarBurgers.length > 0) {
      navbarBurgers.forEach(function (navbarBurger) {
        navbarBurger.addEventListener('click', function (e) {
          var eventTarget = e.target;
          if (eventTarget.tagName.toLowerCase() != 'a') {
            eventTarget = e.target.parentElement;
          }
          var navbarTarget = document.getElementById(eventTarget.dataset.target);

          if (navbarTarget) {
            navbarBurger.classList.toggle('is-active');
            navbarTarget.classList.toggle('is-active');
            navbarTarget.classList.toggle('is-hidden');
          }
        });
      });
    }
  },

  onWindowHashChanged: function onWindowHashChanged() {
    var hash = location.hash.replace('#', '');

    if (hash.length) {
      console.log("hash:", hash);
      var videoHeros = document.getElementsByClassName('video-hero');

      for (var i = 0; i < videoHeros.length; i++) {
        var videoHero = videoHeros[i];
        console.log("videoHero.id:", videoHero.id);
        if (videoHero.id == hash) {
          videoHero.classList.remove('is-not-visible');
        } else {
          videoHero.classList.add('is-not-visible');
        }
      }
    }
  },

  videoSlideshow: function videoSlideshow() {
    window.addEventListener('hashchange', function () {
      var videoHeros = document.getElementsByClassName('video-hero');

      var hash = location.hash.replace('#', '');
      if (hash.trim() == "") {
        hash = videoHeros[0].id;
      }

      for (var i = 0; i < videoHeros.length; i++) {
        var videoHero = videoHeros[i];

        if (videoHero.id == hash) {
          videoHero.classList.remove('is-not-visible');

          var videos = videoHero.getElementsByTagName('video');
          for (var k = 0; k < videos.length; k++) {
            videos[k].load();
            videos[k].play();
          }
          if (videos.length) {
            var nextVideoHeroHash = "";
            if (i + 1 >= videoHeros.length) {
              nextVideoHeroHash = videoHeros[0].id;
            } else {
              nextVideoHeroHash = videoHeros[i + 1].id;
            }

            videos[0].addEventListener('ended', function () {
              window.location.hash = "#" + nextVideoHeroHash;
            }, { once: true });
          }
        } else {
          videoHero.classList.add('is-not-visible');

          var _videos = videoHero.getElementsByTagName('video');
          for (var _k = 0; _k < _videos.length; _k++) {
            _videos[_k].pause();
          }
        }
      }
    });

    window.dispatchEvent(new HashChangeEvent("hashchange"));
  }
};

document.addEventListener('DOMContentLoaded', function () {
  init.navbarBurgers();
  init.videoSlideshow();
});