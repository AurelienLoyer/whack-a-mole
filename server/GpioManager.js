const ManagerInterface = require('./ManagerInterface')
const Gpio = require('onoff').Gpio

module.exports = class GpioManager extends ManagerInterface {
    constructor() {
        super()
        this.buttonsPins = [
            40, 35, 11,
            38, 33, 13,
            37, 32,
        ]
        this.ledsPins = [
            31, 24, 23,
            21, 22, 19,
            18, 15, 16,
        ]
        this.leds = [
            new Gpio(this.ledsPins[0], 'out'), new Gpio(this.ledsPins[1], 'out'), new Gpio(this.ledsPins[2], 'out'),
            new Gpio(this.ledsPins[3], 'out'), new Gpio(this.ledsPins[4], 'out'), new Gpio(this.ledsPins[5], 'out'),
            new Gpio(this.ledsPins[6], 'out'), new Gpio(this.ledsPins[7], 'out'), new Gpio(this.ledsPins[8], 'out'),
        ];

        this.init()
    }

    init() {
        const buttons = require('rpi-gpio-buttons')(this.buttonsPins);
        buttons.setTiming({
            pressed: 100,
            clicked: 100,
        });

        buttons.on('pressed', function (pin) {
            this.broadcast({ type: 'press', data: this.buttonsPins.indexOf(pin) + 1 });
        });

    }
}
