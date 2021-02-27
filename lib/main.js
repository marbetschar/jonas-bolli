'use strict';

var init = {
  navbarBurgers: function navbarBurgers() {
    var navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);

    if (navbarBurgers.length > 0) {
      navbarBurgers.forEach(function (navbarBurger) {
        navbarBurger.addEventListener('click', function (e) {
          var navbarTarget = document.getElementById(e.target.dataset.target);

          e.target.classList.toggle('is-active');
          navbarTarget.classList.toggle('is-active');
          navbarTarget.classList.toggle('is-hidden');
        });
      });
    }
  },

  videoSlideshow: function videoSlideshow() {
    var containerVideo = document.getElementById('container-video');
    var navbarVideo = document.getElementById('navbar-video');

    if (containerVideo && navbarVideo) {
      var videos = containerVideo.getElementsByTagName('video');
      var anchors = navbarVideo.getElementsByTagName('a');

      if (videos.length != anchors.length) {
        console.error("video-count does not match anchor-count.");
        return;
      } else if (!videos.length) {
        console.error("No videos available.");
        return;
      }

      anchors[0].classList.add('is-active');
      videos[0].classList.remove('is-not-visible');
      videos[0].load();

      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = anchors[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var anchor = _step.value;

          anchor.addEventListener('click', function (e) {
            e.preventDefault();

            for (var k = 0; k < videos.length; k++) {
              if (anchors[k] == e.target) {
                if (!anchors[k].classList.contains('is-active')) {
                  anchors[k].classList.add('is-active');
                  videos[k].classList.remove('is-not-visible');
                  videos[k].load();
                }
              } else {
                anchors[k].classList.remove('is-active');
                videos[k].classList.add('is-not-visible');
              }
            }
          });
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }
    }
  }
};

document.addEventListener('DOMContentLoaded', function () {
  init.navbarBurgers();
  init.videoSlideshow();
});