import { Tick } from './core/tick.js'
import { now, createEmptyArray, isObject } from './util/index.js'

class ScheduleItem {
	static create (fn, gap, context) {
		const item = new ScheduleItem(fn, gap, context)
		return item
	}

	constructor (fn, gap, context) {
		const tick = new Tick(fn, context)
		this.tick = tick
		this.gap = gap
		this.__gap = this.gap
	}

	restart () {
		this.__currentTime = null
	}

	update () {
		if (!this.__currentTime) {
			this.__currentTime = now()
		}

		const leftTime = now() - this.__currentTime

		this.__gap -= leftTime
		if (this.__gap <= 0) {
			this.tick.run()
			this.__gap = this.gap
		}

		this.__currentTime = now()
	}
}

export default class Scheduler {
	constructor () {
		this.version = '__VERSION__'
		this.ticks = createEmptyArray()
	}

	add (fn, gap = 16.67, context) {
		const item = ScheduleItem.create(fn, gap, context)
		this.ticks.push(item)

		return () => {
			this.ticks.$remove(item)
		}
	}

	addOnce (fn, gap = 16.67, context) {
		const destroyCallFun = () => {
			if (isObject(context)) {
				fn = fn.bind(context)
			}

			fn()
			this.ticks.$remove(item)
		}
		const item = ScheduleItem.create(destroyCallFun, gap, context)
		this.ticks.push(item)

		return () => {
			this.ticks.$remove(item)
		}
	}

	start () {
		if (this._start) return
		this._start = true
		this.ticks.forEach(tick => tick.restart())
	}

	update () {
		if (!this._start) return

		this.ticks.forEach(tick => tick.update())
	}

	stop () {
		this._start = false
	}
}
