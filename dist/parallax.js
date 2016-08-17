var Parallax = (function () {
  'use strict';

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
    var offset = p.getBoundingClientRect().top;
    // const range = p.parallaxRange || range;
    var speed = p.parallaxSpeed;

    var position;

    if (mode) {
      // dont start parallaxin' until this here thing is within range (ie. "range"
      // pixels from the bottom of the screen)
      if (height < offset - range) { return; }

      position = -offset / height * range;      // -1 -> 0.... -range -> 0
      position *= speed;
    } else {
      // parallax items immediately, irrespective of where they are on the page
      position = speed * scroll;
    }

    // no IE9, nor non 3d-accellerated browsers
    p.style[transform] = 'translate3d(0, ' + position + 'px, 0)';
  }


  var parallax$1 = {
    init: function(element, opts) {
      if ( opts === void 0 ) opts = {};

      parallax = document.querySelectorAll(element || '.parallax');

      if (!parallax || !transform) { return false; }

      // Object.assign({range:200, mode:1}, opts);
      range = opts.range ? opts.range : 200;
      mode = opts.mode ? opts.mode : 1;

      Array.prototype.forEach.call(parallax, function(p, i) {

        // speed:
        // -1: translate up as fast as you scroll up ie. moving up 2x
        //  0: normal ie. no translation
        //  1: translate down as fast as you scroll up ie. "fixed" position
        p.parallaxSpeed = +(p.getAttribute('data-parallax-speed') || 0);      // + is "parseInt"

        // range:
        // the distance to parallax the element once it's on screen
        p.parallaxRange = +(p.getAttribute('data-parallax-range') || 0);      // + is "parseInt"

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

  return parallax$1;

}());