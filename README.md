## Scheduler that runs an update loop that other objects listen to.

## Usage

```js
let schedule = new Scheduler()
schedule.start();
const destroyCallFun = schedule.add(function () {
	console.log(this) // {wow: 'me'} per second
}, 1000, { wow: 'me' })

schedule.addOnce(() => console.log('once'))

const fn = () => console.log(Math.random())
schedule.add(fn, 2000)

setTimeout(function () {
	destroyCallFun()
}, 1000 * 90)

function start () {
	requestAnimationFrame(start)
	schedule.update()
}
start()
```

## stop

```js
schedule.stop();
```

