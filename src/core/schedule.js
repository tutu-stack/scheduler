const noop = Function.prototype

export default class Schedule {
	constructor (fn, context, once = false) {
		this.fn = typeof fn === 'function' ? fn : noop
		this.context = context
		this.once = once
		this.isDestroyed = false
	}

	match (fn, context) {
		return this.fn === fn && this.context == context
	}

	run () {
		this.fn.apply(this.context, arguments)

		if (this.once) {
			this.destroy()
		}

		return this
	}

	destroy () {
		this.isDestroyed = true
		this.fn = null
		this.context = null
		this.destroyEmitParentCallback && this.destroyEmitParentCallback()
	}
}
