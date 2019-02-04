//sudo node servo.2.js 500 => 90 back
//sudo node servo.2.js 1500 => 0
//sudo node servo.2.js 2500 => 90 Front

const Gpio = require('pigpio').Gpio;

const motor = new Gpio(4, {mode: Gpio.OUTPUT});

const pulseWidth = process.argv[2];

const sleep = (time) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, time);
    });
};

const foo = async () => {
    console.log(pulseWidth);
    motor.servoWrite(pulseWidth);
    await sleep(500);
    console.log("slept")
};
