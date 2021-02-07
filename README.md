## CMButton

### How to use

```javascript
import CMButton from 'CMButton';

// ESP32 pin to which the button is connected
const btnPin = 4;

// Instantiate CMButton class
const btn = new CMButton(btnPin);
```

### Features

Customize duration of button events:

```javascript
const btn = new CMButton(btnPin, {
	clickDuration: 200,
	doubleClickDuration: 750,
	longPressDuration: 900
});
```

Listen for button events:

- Press
```javascript
btn.on('press', () => {
	console.log('Pressed!');
});
```
- Release
```javascript
btn.on('release', () => {
	console.log('Released!');
});
```
- Click
```javascript
btn.on('click', () => {
	console.log('Clicked!');
});
```
- Double Click
```javascript
btn.on('doubleClicked', () => {
	console.log('Double Clicked!');
});
```
- Long Press
```javascript
btn.on('longPress', () => {
	console.log('Long Pressed!');
});
```

### Scheme

![](https://github.com/code-main/ButtonLowJS/blob/main/ButtonScheme.png?raw=true)