import Button from './Button';

// ESP32 pin to which the button is connected
const btnPin = 4;

// Instantiate Button class
const btn = new Button(btnPin);

// Listen for click event
btn.on('click', () => {
  console.log('Clicked!');
});

// Listen for long press event
btn.on('longPress', () => {
  console.log('Long pressed!');
});
