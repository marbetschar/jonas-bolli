const init = {
  navbarBurgers: () => {
      const navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);

      if (navbarBurgers.length > 0) {
        navbarBurgers.forEach(navbarBurger => {
          navbarBurger.addEventListener('click', e => {
            const navbarTarget = document.getElementById(e.target.dataset.target);

            e.target.classList.toggle('is-active');
            navbarTarget.classList.toggle('is-active');
            navbarTarget.classList.toggle('is-hidden');
          });
        });
      }
  },

  videoSlideshow: () => {
    let containerVideo = document.getElementById('container-video');
    let navbarVideo = document.getElementById('navbar-video');

    if (containerVideo && navbarVideo) {
      var videos = containerVideo.getElementsByTagName('video');
      var anchors = navbarVideo.getElementsByTagName('a');

      if (videos.length != anchors.length) {
        console.error ("video-count does not match anchor-count.");
        return;
      } else if (!videos.length) {
        console.error ("No videos available.");
        return;
      }

      anchors[0].classList.add('is-active');
      videos[0].classList.remove('is-not-visible');
      videos[0].load();

      for (let anchor of anchors) {
        anchor.addEventListener('click', (e) => {
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
    }
  }
};

document.addEventListener('DOMContentLoaded', () => {
  init.navbarBurgers();
  init.videoSlideshow();
});