var util = require('util');
var events = require('events');

var Gpio = require('pigpio').Gpio;

var motor = new Gpio(4, {mode: Gpio.OUTPUT});

var pulseWidth = 1500;

var PizzaCrust = {
  NORMAL:    0,
  DEEP_DISH: 1,
  THIN:      2,
};

var PizzaToppings = {
  NONE:           0,
  PEPPERONI:      1 << 0,
  MUSHROOMS:      1 << 1,
  EXTRA_CHEESE:   1 << 2,
  BLACK_OLIVES:   1 << 3,
  CANADIAN_BACON: 1 << 4,
  PINEAPPLE:      1 << 5,
  BELL_PEPPERS:   1 << 6,
  SAUSAGE:        1 << 7,
};

var PizzaBakeResult = {
  HALF_BAKED: 0,
  BAKED:      1,
  CRISPY:     2,
  BURNT:      3,
  ON_FIRE:    4
};

function Pizza() {
  events.EventEmitter.call(this);
  this.toppings = PizzaToppings.NONE;
  this.crust = PizzaCrust.NORMAL;
}

util.inherits(Pizza, events.EventEmitter);

Pizza.prototype.bake = function(givenPulse) {
  var time = 500;//temperature * 10;
  var self = this;
  console.log('Servo pulse at', temperature);
  if(givenPulse < 500) {
    pulseWidth = 500;
  } else if(givenPulse > 2500) {
    pulseWidth = 2500;
  } else {
    pulseWidth = givenPulse;
  }

  motor.servoWrite(pulseWidth);
  
  setTimeout(function() {
    var result = PizzaBakeResult.BAKED;
      /*(temperature < 350) ? PizzaBakeResult.HALF_BAKED:
      (temperature < 450) ? PizzaBakeResult.BAKED:
      (temperature < 500) ? PizzaBakeResult.CRISPY:
      (temperature < 600) ? PizzaBakeResult.BURNT:
                            PizzaBakeResult.ON_FIRE;*/
    self.emit('ready', result);
  }, time);
};

module.exports.Pizza = Pizza;
module.exports.PizzaToppings = PizzaToppings;
module.exports.PizzaCrust = PizzaCrust;
module.exports.PizzaBakeResult = PizzaBakeResult;
