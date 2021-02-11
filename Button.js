import { pins, INPUT, DIGITAL } from 'gpio';
import EventEmitter from 'events';

/**
 * Default config for button events
 * 
 * Click: Has to be clicked in less than 350ms
 * 
 * Double Click: Has to be double clicked in less than 1000ms
 * 
 * Long Press: Has to be long pressed in less than 1500ms
 */
const defaultConfig = {
  clickDuration: 350,
  doubleClickDuration: 900,
  longPressDuration: 1500
};

/**
 * Button class
 */
class Button extends EventEmitter {
  /**
   * Button class
   * @param {number} pin ESP32 pin to which the button is connected
   * @param {defaultConfig} config Configuration for button events
   * @example
   * defaultConfig = {
   *   clickDuration: 350,
   *   doubleClickDuration: 1000,
   *   longPressDuration: 1500
   * }
   */
  constructor(pin, config = defaultConfig) {
    super();

    /**
     * ESP32 pin to which the button is connected
     */
    this.pin = pin;

    /**
     * Milliseconds in which Click has to occur
     */
    this.clickDuration = config.clickDuration;

    /**
     * Milliseconds in which Double Click has to occur
     */
    this.doubleClickDuration = config.doubleClickDuration;

    /**
     * Milliseconds in which Long Press has to occur
     */
    this.longPressDuration = config.longPressDuration;

    /**
     * Last state checked for button
     */
    this.lastIsPressed = false;

    /**
     * Time when last Press occurred (in milliseconds)
     */
    this.lastPressedMillis = 0;

    /**
     * Time when last Click occurred (in milliseconds)
     */
    this.lastClickedMillis = 0;

    this.init();
  }

  /**
   * Initialize button
   */
  init() {
    pins[this.pin].setType(INPUT);

    // Checks button state every 75ms
    setInterval(this.checkState.bind(this), 75);
  }
  
  /**
   * Checks button state
   */
  checkState() {
    // Get button state value
    pins[this.pin].getValue(DIGITAL, (err, value) => {
      const isPressed = value;
      const millis = new Date().getTime();
      
      // Pressed
      if (!this.lastIsPressed && isPressed) {
        this.emit('press');
        this.lastPressedMillis = new Date().getTime();
      }
      // Released
      else if (this.lastIsPressed && !isPressed) {
        this.emit('release');
  
        // Clicked
        if (millis - this.lastPressedMillis <= this.clickDuration) {
          this.emit('click');
  
          // Double clicked
          if (millis - this.lastClickedMillis < this.doubleClickDuration) {
            this.emit('doubleClick');
          }
  
          this.lastClickedMillis = new Date().getTime();
        }
        // Long pressed
        else if (millis - this.lastPressedMillis > this.longPressDuration) {
          this.emit('longPress');
        }
      }
      
      this.lastIsPressed = isPressed;
    });
  }
}

export default Button;