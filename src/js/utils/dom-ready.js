export default (callback = () => {}) => {
  let ready = false;

  const detach = () => {
    if (document.addEventListener) {
      document.removeEventListener('DOMContentLoaded', completed);
      window.removeEventListener('load', completed);
    } else {
      document.detachEvent('onreadystatechange', completed);
      window.detachEvent('onload', completed);
    }
  }

  const completed = () => {
    if (!ready && (document.addEventListener || event.type === 'load' || document.readyState === 'complete')) {
      ready = true;
      detach();
      callback();
    }
  };

  if (document.readyState === 'complete') {
    callback();
  } else if (document.addEventListener) {
    document.addEventListener('DOMContentLoaded', completed);
    window.addEventListener('load', completed);
  } else {
    document.attachEvent('onreadystatechange', completed);
    window.attachEvent('onload', completed);

    let top = false;
    try {
      top = (window.frameElement == null) && document.documentElement;
    } catch(e) {}

    if (top && top.doScroll) {
      (function scrollCheck() {
        if (ready) return;

        try {
          top.doScroll('left');
        } catch(e) {
          return setTimeout(scrollCheck, 50);
        }

        ready = true;

        detach();
        callback();
      })();
    }
  }
};