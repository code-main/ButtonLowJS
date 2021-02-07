import CMButton from './CMButton';

const btnPin = 4;

const btn = new CMButton(btnPin);

// Listen for click event
btn.on('click', () => {
  console.log('Clicked!');
});

// Listen for long press event
btn.on('longPress', () => {
  console.log('Long pressed!');
});
