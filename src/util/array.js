export function createEmptyArray () {
	const _ = []

	_.removeLast = removeLast
	_.last = last
	_.$remove = $remove

	return _

	function removeLast () {
		this.splice(this.length - 1, 1)
		return this
	}

	function $remove (item) {
		const idx = this.indexOf(item)
		if (idx > -1) {
			this.splice(idx, 1)
		}

		return this
	}

	function last () {
		return this[this.length - 1]
	}
}
