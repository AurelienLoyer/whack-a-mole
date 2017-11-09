const keypress = require('keypress')
const ManagerInterface = require('./ManagerInterface')


module.exports = class GpioManager extends ManagerInterface {
    constructor() {
        super()

        const buttonsPins = [
            40, 35, 11,
            38, 33, 13,
            37, 32,
        ]
        const ledsPins = [
            31, 24, 23,
            21, 22, 19,
            18, 15, 16,
        ]
    }

    init() {

    }
}
