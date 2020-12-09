export const increasePkgVersion = version => {
	let v = Number(version.split('.').join(''))
	++v
	let tempArr = []
	tempArr.push(v.pop(), v.pop(), v)
	return tempArr.join('.')
}

export const now = Date.now || function () {
	return new Date().getTime()
}

export function isRealNum (val) {
	if (val === '' || val == null) {
		return false
	}
	if (!isNaN(val)) {
		return true
	} else {
		return false
	}
}
