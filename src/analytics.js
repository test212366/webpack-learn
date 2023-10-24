function createAnalytics() {
	let counter = 0
	let destr = false

	const listener = () => counter++
	document.addEventListener('click', listener)

	return {
		destroy() {
			document.removeEventListener('click', listener)
			destr = true
		},
		getClicks() {
			if (destr) {
				return 'analyt is dest'
			}
			return counter
		}
	}
}

window.analytics = createAnalytics()
console.log('1')