export * from './array'

export const now = Date.now || function () {
	return new Date().getTime()
}

export function isRealNum (val) {
	return (!isNaN(val) && isNumber(val))
}

export function isNaN (arg) {
	return arg !== arg
}

export function isFuzzyObject(arg) {
	return typeof arg === 'object'
}

const toString = Object.prototype.toString
/**
 * Internal function for creating a toString-based type tester.
 * @param  {[type]} name [description]
 * @return {[type]}      [description]
 */
function tagTester (name) {
	return function (obj) {
		return toString.call(obj) === '[object ' + name + ']'
	}
}
export const isArguments = tagTester('Arguments')
export const isFunction = tagTester('Function')
export const isString = tagTester('String')
export const isNumber = tagTester('Number')
export const isDate = tagTester('Date')
export const isRegExp = tagTester('RegExp')
export const isError = tagTester('Error')
export const isSymbol = tagTester('Symbol')
export const isMap = tagTester('Map')
export const isWeakMap = tagTester('WeakMap')
export const isSet = tagTester('Set')
export const isWeakSet = tagTester('WeakSet')
export const isObject = tagTester('Object')
