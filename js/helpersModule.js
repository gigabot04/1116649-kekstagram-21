'use strict';

{
  let lastTimeout;
  const debounce = (cb, timeout = 500) => {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(cb, timeout);
  };
  window.helpersModule = {
    debounce
  };
}
