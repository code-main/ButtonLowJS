# ButtonLowJS

## How to use

```console
foo@bar:~$ lowsync install @codemain/buttonlowjs
-- OR
foo@bar:~$ npm install @codemain/buttonlowjs
```

```javascript
import Button from '@codemain/buttonlowjs';

// ESP32 pin to which the button is connected
const btnPin = 4;

// Instantiate Button class
const btn = new Button(btnPin);

// Listen for click event
btn.on('click', () => {
  console.log('Clicked!');
});
```

## Features

Customize duration of button events:

```javascript
const btn = new Button(btnPin, {
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

## Scheme

![](https://github.com/code-main/ButtonLowJS/blob/main/ButtonScheme.png?raw=true)