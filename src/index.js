import { ScheduleManager } from './core/scheduleManager.js'
import { requestAnimationFrame, cancelAnimationFrame } from './core/raf'

export default class Schedule extends ScheduleManager {
	constructor () {
		super()

		this.version = '__VERSION__'
		this.started = false
	}

	update () {
		this._requestId = requestAnimationFrame(() => this.update())
		this.emitAll()
	}

	stop () {
		if (this.started) {
			this.started = false
			cancelAnimationFrame(this._requestId)
		}
	}

	start () {
		if (!this.started) {
			this.started = true
			super.start()

			this.update()
		}
	}
}
