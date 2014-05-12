/*
 * parallax
 * https://github.com/apathetic/parallax
 *
 * Copyright (c) 2013 Wes Hatch
 * Licensed under the MIT license.
 *
 */


var parallax = (function(window, undefined ) {

	'use strict';

	var parallax,
		ticking = false,
		scroll = window.scrollY,	// 0
		height = window.innerHeight,
		transform = 'webkitTransform';		// [TODO]

		/*
		var transform = (function() {
			return 'webkitTransform';
			var p,
				el = document.createElement('fake'),
				prefixes = ['webkit', 'Moz', 'o', 'ms'];

			for (p in prefixes) {
				if (typeof el.style[prefixes[i] + propertie] !== 'undefined') {
					cssPrefixString[propertie] = prefixes[i];
					return prefixes[i] + propertie;
				}
			}
			return false;
		}());
		*/


	function onScroll() {
		if (!ticking) {
			ticking = true;
			window.requestAnimationFrame(updateParallax);
			scroll = window.scrollY;
		}
	}

	function onResize() {
		scroll = window.scrollY;
		height = window.innerHeight;
		updateParallax();
	}

	function updateParallax() {

		var position;
		// var offset = 444;	//

		Array.prototype.forEach.call(parallax, function(p, i){

			var speed = p.parallaxSpeed;
			var top = p.getBoundingClientRect().top;
			var offset = 0;	// p.parallaxOffset;

			position = (speed * scroll) + offset;

			p.style[transform] = 'translate3d(0, '+ position +'px , 0)';
		});

		ticking = false;
	}


	return {
		init: function(opts) {
			// if(!core.Utils.isTouchDevice && sections.length > 0) {
				if (!transform) { return false; } // progressive enhancement for newer browers only.

				// [TODO] add some checks or sumthing
				parallax = document.querySelectorAll(opts.el || '.parallax');
				/*
				parallax = $(opts.el) || $('.parallax');
				parallax.each(function() {
					this.parallaxSpeed = $(this).data('parallax-speed') || 1;	// store on HTMLElement
				});
				*/

				if ( !parallax ) { return false; }


				Array.prototype.forEach.call(parallax, function(p, i){

					// speed:
					// -1: translate up as fast as you scroll up ie. moving up 2x
					//  0: normal ie. no translation
					//  1: translate down as fast as you scroll up ie. "fixed" position
					p.parallaxSpeed = +(p.getAttribute('data-parallax-speed') || 0);			// + is poor man's parseInt
					// p.parallaxOffset = Math.max(0, p.getBoundingClientRect().top - height);		// how far below the bottom of the page

					// no can do, as images load slowly, affecting the layout of the page:
					setTimeout(function(){
					p.parallaxOffset = Math.max(0, p.getBoundingClientRect().top - window.scrollY);		// how far below the bottom of the page
					}, 1000);
					// this.parallaxDirection = this.getAttribute('data-parallax-direction');









				});


				updateParallax();

				// kick off
				window.addEventListener('scroll', onScroll, false);
				window.addEventListener('resize', onResize, false);
			// }
		},
		destroy: function() {
			window.removeEventListenter('scroll');
			window.removeEventListenter('resize');
			parallax = null;
		}
	};


}( window ));

