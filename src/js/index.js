// deps
import domReady from './utils/dom-ready';
import ensurePoly from './utils/ensure-polyfills';
import getGiphy from './get-giphy';

// some style, move(d) to html tag?
// import '../style/style.scss';

// constants
const PIZZA_DEFAULT_TIME = 5000;
const PIZZA_REFRESH_RATE = 5000;
const PIZZA_SPIN_TIME = 1000;
const PIZZA_SPIN_GIF = '//media.giphy.com/media/prA6olJdnIDKg/giphy.gif';

// helpers
const noop = () => {};
const wait = (time) => new Promise((resolve) => setTimeout(() => resolve(), time));
// const fail = () => new Promise((_, reject) => reject('failz'));
// const ok = () => new Promise((resolve, _) => resolve('ok'));

const preloadImage = (url = '') => {
  return new Promise((resolve, reject) => {
    if (!url) { reject('gief URL bro!'); }

    const image = new Image();
    image.onload = () => resolve(url);
    image.onerror = () => reject(false);
    image.src = url;
  });
};

// 🍕 magic
ensurePoly(domReady(() => {
  console.log('Hello you! Here, have a 🍕');

  // get container
  const $bitch = document.getElementById('Bitch');

  // helpers
  const render = (background = '') => new Promise((resolve) => {
    $bitch.style.backgroundImage = `url("${background}")`;
    resolve();
  });

  const refresh = (refreshRate = PIZZA_REFRESH_RATE) => {
    wait(refreshRate) // let current GIF play for a while...
      .then(getGiphy) // fetch new random GIF
      .then(giphy => preloadImage(giphy.image_original_url))
      .then(image => render(image))
      .then(refresh)
      .catch(e => refresh()); // retry refresh?
  };
  
  const start = () => {
    wait(PIZZA_DEFAULT_TIME) // show get-me GIF for a while...
    .then(() => render(PIZZA_SPIN_GIF)) // show pizza spinner GIF
    .then(() => refresh(PIZZA_DEFAULT_TIME / 2)) // ...and start disco refresh!
    .catch(() => noop);
  };
  
  // just do it!
  preloadImage(PIZZA_SPIN_GIF).then(start);
}));
