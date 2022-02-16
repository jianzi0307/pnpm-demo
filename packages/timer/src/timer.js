// window.requestAnimationFrame polyfill
const requestAnimFrame = (function () {
  return (
    window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    function (/* function */ callback) {
      window.setTimeout(callback, 1000 / 60);
    }
  );
})();

// 替代setInteral，requestAnimationFrame的实现
const setRequestInterval = (fn, delay) => {
  if (
    !window.requestAnimationFrame &&
    !window.webkitRequestAnimationFrame &&
    !(
      window.mozRequestAnimationFrame && window.mozCancelRequestAnimationFrame
    ) && // Firefox 5 ships without cancel support
    !window.oRequestAnimationFrame &&
    !window.msRequestAnimationFrame
  ) {
    return window.setInterval(fn, delay);
  }
  let start = new Date().getTime(),
    handle = new Object();
  function loop() {
    const current = new Date().getTime(),
      delta = current - start;
    if (delta >= delay) {
      fn.call();
      start = new Date().getTime();
    }
    handle.value = requestAnimFrame(loop);
  }
  handle.value = requestAnimFrame(loop);
  return handle;
};

// 替代clearInteral，requestAnimationFrame的实现
const clearRequestInterval = (handle) => {
  window.cancelAnimationFrame
    ? window.cancelAnimationFrame(handle.value)
    : window.webkitCancelAnimationFrame
    ? window.webkitCancelAnimationFrame(handle.value)
    : window.webkitCancelRequestAnimationFrame
    ? window.webkitCancelRequestAnimationFrame(
        handle.value
      ) /* Support for legacy API */
    : window.mozCancelRequestAnimationFrame
    ? window.mozCancelRequestAnimationFrame(handle.value)
    : window.oCancelRequestAnimationFrame
    ? window.oCancelRequestAnimationFrame(handle.value)
    : window.msCancelRequestAnimationFrame
    ? window.msCancelRequestAnimationFrame(handle.value)
    : clearInterval(handle);
};

// 替代setTimeout，requestAnimationFrame的实现
const setRequestTimeout = (fn, delay) => {
  if (
    !window.requestAnimationFrame &&
    !window.webkitRequestAnimationFrame &&
    !(
      window.mozRequestAnimationFrame && window.mozCancelRequestAnimationFrame
    ) && // Firefox 5 ships without cancel support
    !window.oRequestAnimationFrame &&
    !window.msRequestAnimationFrame
  ) {
    return window.setTimeout(fn, delay);
  }
  const start = new Date().getTime(),
    handle = new Object();
  function loop() {
    const current = new Date().getTime(),
      delta = current - start;
    delta >= delay ? fn.call() : (handle.value = requestAnimFrame(loop));
  }
  handle.value = requestAnimFrame(loop);
  return handle;
};

// 替代clearTimeout，requestAnimationFrame的实现
const clearRequestTimeout = (handle) => {
  window.cancelAnimationFrame
    ? window.cancelAnimationFrame(handle.value)
    : window.webkitCancelAnimationFrame
    ? window.webkitCancelAnimationFrame(handle.value)
    : window.webkitCancelRequestAnimationFrame
    ? window.webkitCancelRequestAnimationFrame(
        handle.value
      ) /* Support for legacy API */
    : window.mozCancelRequestAnimationFrame
    ? window.mozCancelRequestAnimationFrame(handle.value)
    : window.oCancelRequestAnimationFrame
    ? window.oCancelRequestAnimationFrame(handle.value)
    : window.msCancelRequestAnimationFrame
    ? window.msCancelRequestAnimationFrame(handle.value)
    : clearTimeout(handle);
};

export {
  setRequestInterval,
  clearRequestInterval,
  setRequestTimeout,
  clearRequestTimeout,
};
