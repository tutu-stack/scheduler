// http://paulirish.com/2011/requestanimationframe-for-smart-animating/
// http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating

// requestAnimationFrame polyfill by Erik Möller
// fixes from Paul Irish and Tino Zijdel

import { now } from '../util/index'

let lastTime = 0
let _requestAnimationFrame
let _cancelAnimationFrame
const vendors = ['ms', 'moz', 'webkit', 'o']
for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
	_requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame']
	_cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] ||
	window[vendors[x] + 'CancelRequestAnimationFrame']
}

if (!_requestAnimationFrame) {
	_requestAnimationFrame = function (callback, element) {
		var currTime = now()
		var timeToCall = Math.max(0, 16 - (currTime - lastTime))
		var id = window.setTimeout(function () {
			callback(currTime + timeToCall)
		}, timeToCall)
		lastTime = currTime + timeToCall
		return id
	}
}

if (!_cancelAnimationFrame) {
	_cancelAnimationFrame = function (id) {
		clearTimeout(id)
	}
}

export const requestAnimationFrame = _requestAnimationFrame
export const cancelAnimationFrame = _cancelAnimationFrame
