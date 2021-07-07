const init = {
  navbarBurgers: () => {
      const navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('a.navbar-burger'), 0);

      if (navbarBurgers.length > 0) {
        navbarBurgers.forEach(navbarBurger => {
          navbarBurger.addEventListener('click', e => {
            let eventTarget = e.target;
            if (eventTarget.tagName.toLowerCase() != 'a') {
              eventTarget = e.target.parentElement;
            }
            const navbarTarget = document.getElementById(eventTarget.dataset.target);

            if (navbarTarget) {
              navbarBurger.classList.toggle('is-active');
              navbarTarget.classList.toggle('is-active');
              navbarTarget.classList.toggle('is-hidden');
            }
          });
        });
      }
  },

  onWindowHashChanged: () => {
    let hash = location.hash.replace('#','');

    if (hash.length) {
      console.log("hash:", hash);
      let videoHeros = document.getElementsByClassName('video-hero');

      for( let i = 0; i < videoHeros.length; i++) {
        let videoHero = videoHeros[i];
        console.log("videoHero.id:", videoHero.id);
        if(videoHero.id == hash) {
          videoHero.classList.remove('is-not-visible');
        } else {
          videoHero.classList.add('is-not-visible');
        }
      }
    }
  },

  videoSlideshow: () => {
    window.addEventListener('hashchange', () => {
      let videoHeros = document.getElementsByClassName('video-hero');

      let hash = location.hash.replace('#','');
      if (hash.trim() == "") {
        hash = videoHeros[0].id;
      }

      for( let i = 0; i < videoHeros.length; i++) {
        let videoHero = videoHeros[i];

        if(videoHero.id == hash) {
          videoHero.classList.remove('is-not-visible');

          let videos = videoHero.getElementsByTagName('video');
          for (let k = 0; k < videos.length; k++) {
            videos[k].load();
            videos[k].play();
          }
          if (videos.length) {
            var nextVideoHeroHash = "";
            if (i+1 >= videoHeros.length) {
              nextVideoHeroHash = videoHeros[0].id;
            } else {
              nextVideoHeroHash = videoHeros[i+1].id;
            }

            videos[0].addEventListener('ended', function(){
              window.location.hash = "#" + nextVideoHeroHash;
            }, { once: true });
          }

        } else {
          videoHero.classList.add('is-not-visible');

          let videos = videoHero.getElementsByTagName('video');
          for (let k = 0; k < videos.length; k++) {
            videos[k].pause();
          }
        }
      }
    });

    window.dispatchEvent(new HashChangeEvent("hashchange"));
  }
};

document.addEventListener('DOMContentLoaded', () => {
  init.navbarBurgers();
  init.videoSlideshow();

  if((navigator.userAgent.match(/iPhone/i)) || (navigator.userAgent.match(/iPod/i))) {
    let navbarElements = document.getElementsByClassName('video-navbar');
    if (navbarElements.length) {
      for (let i = 0; i < navbarElements.length; i++) {
        navbarElements[i].classList.add("ios-small");
      }
    }
  }
});