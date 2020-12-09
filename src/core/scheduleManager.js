import Schedule from './schedule.js'
import { now, isRealNum } from '../util/index.js'

export class ScheduleManager {
	constructor () {
		this.tickers = {}
	}

	/**
	 * 添加function
	 * @param {...[fn]} args [function]
	 * @param {...[context]} args [上下文]
	 * @param {...[gap]} args [时间间隔]
	 * @param {...[once]} args [是否一次]
	 */
	add (...args) {
		const fn = args[0]
		const gap = isRealNum(args[1]) ? args[1] : parseInt(args[2])
		const context = isRealNum(args[1]) ? null : args[1]
		const once = args[3]

		this._add(new Schedule(fn, context, once), gap || 0)

		if (this.started) {
			this.start()
		}

		return this
	}

	addOnce (...args) {
		this.add(args[0], args[1], args[2], true)
	}

	remove (fn, context) {
		Object.keys(this.tickers).map(gap => {
			const ticks = this.tickers[gap]
			ticks.forEach((tick, index) => {
				if (tick.match(fn, context)) {
					tick.destroy()
				}
			})
		})

		return this
	}

	start () {
		Object.keys(this.tickers).map(gap => {
			const ticks = this.tickers[gap]
			ticks.prevTime = ticks.prevTime || now()
		})
	}

	empty () {
		this.tickers = {}
	}

	emitAll () {
		Object.keys(this.tickers).map(gap => {
			const ticks = this.tickers[gap]

			if (!gap) {
				ticks.forEach(tick => tick.run())
			} else {
				if (now() - ticks.prevTime >= gap) {
					ticks.prevTime = now()
					ticks.forEach(tick => tick.run())
				}
			}
		})
	}

	_add (node, gap) {
		if (!this.tickers[gap]) {
			this.tickers[gap] = []
		}

		const len = this.tickers[gap].push(node)
		node.destroyEmitParentCallback = () => {
			console.log(len)
			this.tickers[gap].splice(len - 1, 1)
		}

		if (this.started) {
			this.tickers[gap].prevTime = now()
		}

		return node
	}
}
