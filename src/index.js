import Tick from './core/schedule.js'
import { now, createEmptyArray } from './util/index.js'

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

			// once
			if (this._once) {
				this.$parent.ticks.$remove(this)
			}
		}

		this.__currentTime = now()
	}
}

export default class Scheduler {
	constructor () {
		this.version = '__VERSION__'
		this.ticks = createEmptyArray()
	}

	add (fn, gap, context) {
		const item = ScheduleItem.create(fn, gap, context)
		item.$parent = this
		this.ticks.push(item)

		return () => {
			this.ticks.$remove(item)
		}
	}

	addOnce (fn, gap, context) {
		const item = ScheduleItem.create(fn, gap, context)
		item._once = true
		item.$parent = this
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
