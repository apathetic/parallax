/*
 * parallax
 * https://github.com/apathetic/parallax
 *
 * Copyright (c) 2013, 2014 Wes Hatch
 * Licensed under the MIT license.
 *
 */


var parallax;
var ticking = false;
var range;
var mode;
var scroll = window.scrollY;
var height = window.innerHeight;

var transform = (function() {
  var transforms = ['transform', 'webkitTransform', 'MozTransform', 'OTransform'];
  var el = document.createElement('fake');
  var i = transforms.length;

  for (i; --i;) {
    // note: we don't test "ms" prefix, (as that gives us IE9 which doesn't support
    // transforms3d anyway. IE10 test will work with "transform")
    if (el.style[ transforms[i] ] !== undefined) { return transforms[i]; }
  }
  return false;
})();

function onScroll() {
  if (!ticking) {
    ticking = true;
    window.requestAnimationFrame(updateParallax);
    scroll = window.scrollY;
  }
}

function onResize() {
  height = window.innerHeight;
  updateParallax();
}

function updateParallax() {
  Array.prototype.forEach.call(parallax, calculate);
  ticking = false;
}

function calculate(p) {
  var offset = p.getBoundingClientRect().top,
    // range = 200,                        // could be dynamic for each element
    position;

  // dont start parallaxin' until this here thing is within range (ie. "range"
  // pixels from the bottom of the screen)
  if (height < offset - range) { return; }

  if (mode) {
    // parallax items only when they appear on screen
    position = Math.min(1, -offset / height) * range;      // 0 -> range
    position *= p.parallaxSpeed;
  } else {
    // parallax items immediately, irrespective of where they are on the page
    position = p.parallaxSpeed * scroll;
  }

  // no IE9, nor non 3d-accellerated browsers
  p.style[transform] = 'translate3d(0, ' + position + 'px, 0)';
}


var parallax$1 = {
  init: function(opts) {
    parallax = document.querySelectorAll(opts.el || '.parallax');

    if (!parallax || !transform) { return false; }

    range = opts.range ? opts.range : 200;
    mode = opts.mode ? opts.mode : 1;

    Array.prototype.forEach.call(parallax, function(p, i) {

      // speed:
      // -1: translate up as fast as you scroll up ie. moving up 2x
      //  0: normal ie. no translation
      //  1: translate down as fast as you scroll up ie. "fixed" position
      p.parallaxSpeed = +(p.getAttribute('data-parallax-speed') || 1.0);      // + is "parseInt"


      // Calculate each element's initial position:
      // here we find the limit as the offset and adjustment converge:
      var current = p.getBoundingClientRect().top;
      var last = 0;

      while (Math.abs(current - last) > 1) {
        last = current;
        calculate(p);
        current = p.getBoundingClientRect().top;
      }

    });

    window.addEventListener('scroll', onScroll, false);
    window.addEventListener('resize', onResize, false);
  },
  destroy: function() {
    window.removeEventListener('scroll', onScroll);
    window.removeEventListener('resize', onResize);
  }
};

export default parallax$1;