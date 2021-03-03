## Scheduler that runs an update loop that other objects listen to.

## Usage

```js
let schedule = new Scheduler()
schedule.add(function () {
	console.log(this) // {wow: 'me'} per second
}, { wow: 'me' }, 1000)
schedule.start();

schedule.addOnce(() => console.log('once'))

const fn = () => console.log(Math.random())
schedule.add(fn, 2000)

setTimeout(function () {
	schedule.remove(fn)
}, 1000 * 90)

setTimeout(function () {
	schedule.empty()
}, 1000 * 1000);
```

## stop

```js
schedule.stop();
```

