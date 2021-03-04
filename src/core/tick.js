const noop = Function.prototype

export class Tick {
	constructor (fn, context) {
		this.fn = typeof fn === 'function' ? fn : noop
		this.context = context
		this.isDestroyed = false
	}

	match (fn, context) {
		return this.fn === fn && this.context === context
	}

	run () {
		this.fn.apply(this.context, [].slice.call(arguments))

		return this
	}

	destroy () {
		this.isDestroyed = true
		this.fn = null
		this.context = null
		this.destroyEmitParentCallback && this.destroyEmitParentCallback()
	}
}
